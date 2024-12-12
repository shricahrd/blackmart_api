
const userRoutes = require("express").Router();
const{ 
        UserRegistration,
        UserLogin, 
        verifyOTP, 
        ResendUserOTP,
        UserProfile
     } = require("../controller/UserController");
const {
    CustomerRegistrationMiddleware,
    CustomerLoginMiddleware,    
    verifyOTPMiddleware,
    CustomerResendOTPMiddleware,
    isValidUser
} = require("../middleware/userMiddleware");
userRoutes.post("/registration",CustomerRegistrationMiddleware, UserRegistration);
userRoutes.post("/login",CustomerLoginMiddleware, UserLogin);
userRoutes.post("/verify-otp",verifyOTPMiddleware, verifyOTP);
userRoutes.post("/resend-otp",CustomerResendOTPMiddleware, ResendUserOTP);
userRoutes.get("/profile",isValidUser, UserProfile);


module.exports = userRoutes;
