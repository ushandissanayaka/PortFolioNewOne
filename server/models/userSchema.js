import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
    },
    aboutMe: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    portfolioURL: String,
    githubURL: String,
    linkedInURL: String,
    facebookURL: String,
    instegramURL: String,
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    resume: {
        public_id: String,
        url: String,
    },
});

export const UserModel = mongoose.model('User', userSchema);
