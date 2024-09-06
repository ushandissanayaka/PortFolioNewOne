import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { UserModel } from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";
import { generateToken } from "../utils/jwtToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {
    // Log the entire req.files object for debugging
    console.log("FILES RECEIVED:", req.files);

    // Check if files are uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("No files were uploaded!", 400));
    }

    try {
        // Normalize file field names (trim spaces)
        const files = {};
        Object.keys(req.files).forEach((key) => {
            files[key.trim()] = req.files[key];
        });

        // Destructure normalized files
        const { avatar, resume } = files;

        if (!avatar) {
            return next(new ErrorHandler("Avatar file is required!", 400));
        }

        // Upload avatar to Cloudinary
        const cloudinaryResponseForAvatar = await cloudinary.uploader.upload(
            avatar.tempFilePath, 
            { folder: "AVATARS" }
        );

        if (!cloudinaryResponseForAvatar || cloudinaryResponseForAvatar.error) {
            console.error("Cloudinary Error:", cloudinaryResponseForAvatar.error || "Unknown Cloudinary Error");
            return next(new ErrorHandler("Failed to upload avatar!", 500));
        }

        // Initialize cloudinaryResponseForResume as null
        let cloudinaryResponseForResume = null;

        if (resume) {
            // Upload resume to Cloudinary
            cloudinaryResponseForResume = await cloudinary.uploader.upload(
                resume.tempFilePath, 
                { folder: "MY_RESUME" }
            );

            if (!cloudinaryResponseForResume || cloudinaryResponseForResume.error) {
                console.error("Cloudinary Error:", cloudinaryResponseForResume.error || "Unknown Cloudinary Error");
                return next(new ErrorHandler("Failed to upload resume!", 500));
            }
        }

        // Destructure fields from request body
        const {
            fullName,
            email,
            phone,
            aboutMe,
            password,
            portfolioURL,
            githubURL,
            linkedInURL,
            facebookURL,
            instegramURL,
            mediumURL,
        } = req.body;

        // Ensure required fields are provided
        if (!fullName || !email || !password) {
            return next(new ErrorHandler("Missing required fields: fullName, email, or password", 400));
        }

        // Create new user document
        const user = await UserModel.create({
            fullName,
            email,
            phone,
            aboutMe,
            password,
            portfolioURL,
            githubURL,
            linkedInURL,
            facebookURL,
            instegramURL,
            mediumURL,
            avatar: {
                public_id: cloudinaryResponseForAvatar.public_id,
                url: cloudinaryResponseForAvatar.secure_url,
            },
            resume: cloudinaryResponseForResume
                ? {
                    public_id: cloudinaryResponseForResume.public_id,
                    url: cloudinaryResponseForResume.secure_url,
                }
                : null,
        });

        // Respond with success message
        generateToken(user, "User registered!", 201, res);
    } catch (error) {
        console.error("Registration Error:", error);
        return next(new ErrorHandler(error.message, 500));
    }
});

export const login = catchAsyncErrors(async(req,res,next)=>{
    const { email, password } = req.body;
    if(!email || !password){
        return next(new ErrorHandler("Email And Password are required!"));
    }
    const user = await UserModel.findOne({ email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Email or password!"));
    }
    const isPasswordMatch = await user.comparePassword(password);
    if(!isPasswordMatch){
        return next(new ErrorHandler("Invalid Email or password!"));
    }
    generateToken(user, "Logged In", 200, res);
});

export const logout = catchAsyncErrors(async(req, res, next) => {
    res.status(200).cookie("token", "",{
        expires: new Date(Date.now()),
        httpOnly: true,
       
    }).json({
        success: true,
        message: "Logged out",
    });
});

export const getUser = catchAsyncErrors(async(req, res, next ) =>{
    const user = await UserModel.findById(req.user.id);
    res.status(200).json({
        success: true,
        user,
    })

})

export const updateProfile = catchAsyncErrors(async(req, res, next)=>{
    const newUserData = {
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        aboutMe: req.body.aboutMe,
        portfolioURL: req.body.portfolioURL,
        githubURL: req.body.githubURL,
        linkedInURL: req.body.linkedInURL,
        facebookURL: req.body.facebookURL,
        instegramURL: req.body.instegramURL,
        mediumURL: req.body.mediumURL,
    }
    if(req.files && req.files.avatar){
        const avatar = req.files.avatar;
        const user = await UserModel.findById(req.user.id);
        const profileImageId = user.avatar.public_id;
        await cloudinary.uploader.destroy(profileImageId);
        
            // Upload resume to Cloudinary
       const cloudinaryResponse = await cloudinary.uploader.upload(
             avatar.tempFilePath, 
                { folder: "AVATARS" }
            )
        newUserData.avatar = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,

        }

    }
    if(req.files && req.files.resume){
        const resume = req.files.resume;
        const user = await UserModel.findById(req.user.id);
        const resumeId = user.resume.public_id;
        await cloudinary.uploader.destroy(resumeId);
        
            // Upload resume to Cloudinary
        const cloudinaryResponse = await cloudinary.uploader.upload(
             resume.tempFilePath, 
                { folder: "MY_RESUME" }
            )
        newUserData.resume = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
            
        }

    }
    const user = await UserModel.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,

    });
    res.status(200).json({
        success: true,
        message: "profile updated",
        user,
    });
});