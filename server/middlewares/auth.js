import { UserModel} from "../models/userSchema.js"
import { catchAsyncErrors } from "./catchAsyncErrors.js"
import ErrorHandler  from "./error.js"
import jwt from "jsonwebtoken"

export const isAuthenticated = catchAsyncErrors(async(req, res, next) => {
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler("user not authenticated!", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await UserModel.findById(decoded.id)
    next();
});