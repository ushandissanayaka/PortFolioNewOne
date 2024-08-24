import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Message } from "../models/messageSchema.js";

export const sendMessage = catchAsyncErrors(async (req, res, next) => {
    const { senderName, subject, message } = req.body;

    // Check if all required fields are provided
    if (!senderName || !subject || !message) {
        return next(new ErrorHandler("Please Fill Full Form", 400));
    }

    // Create a new message in the database
    const data = await Message.create({ senderName, subject, message });


    res.status(200).json({
        success: true,
        message: "Message Sent",
        data,
    });
});



export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
    const messages = await Message.find();

    res.status(200).json({
        success: true,
        messages,
    });
    
});