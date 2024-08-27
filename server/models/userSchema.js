import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Name Required!"],
    },
    email: {
        type: String,
        required: [true, "Email Required!"],
    },
    phone: {
        type: String,
        required: [true, "Phone Number Required!"],
    },
    aboutMe: {
        type: String,
        required: [true, "About Me Field Is Required!"],
    },
    password: {
        type: String,
        required: [true, "Password Is Required!"],
        minLength: [8, "Password must contain at least 8 characters!"],
        select: false,
    },
    avetar :{
        public_id:{
            type: String,
            required: true,
        },
        url:{
            type: String,
            required: true,
        },
    },
    resume :{
        public_id:{
            type: String,
            required: true,
        },
        url:{
            type: String,
            required: true,
        },
    },
    portfolioU:{
        type: String,
        required: [true, "portfoliio URL Is Required!"],
    },
    githubURL: String,
    linkedInURL: String,
    facebookURL: String,
    instegramURL: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

export const UserModel = mongoose.model("User", userSchema);