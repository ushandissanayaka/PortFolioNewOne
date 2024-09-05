import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { UserModel } from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";

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
        } = req.body;

        // Ensure required fields are provided
        if (!fullName || !email || !password) {
            return next(new ErrorHandler("Missing required fields: fullName, email, or password", 400));
        }

        // Create new user document
        const userModel = await UserModel.create({
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
        res.status(200).json({
            success: true,
            message: "User Registered",
        });
    } catch (error) {
        console.error("Registration Error:", error);
        return next(new ErrorHandler(error.message, 500));
    }
});
