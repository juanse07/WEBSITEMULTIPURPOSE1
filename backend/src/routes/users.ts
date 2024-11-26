import express from "express";
import passport from "passport";
import * as userController from "../controllers/user";
import requiresAuth from "../middlewares/requiresAuth";
import validateRequestSchema from "../middlewares/validateRequestSchema";
import { requestVerificationcODESchema, resetPasswordSchema, signUpSchema } from "../validation/users";
import { profilePicUpload } from "../middlewares/imageUpload";
import { updateUserSchema } from "../validation/users";
import setSessionReturnTo from "../middlewares/setSessionReturnTo";
import env from "../env";


const router = express.Router();
router.get("/me",requiresAuth, userController.getAuthenticatedUser);
router.get("/profile/:username", userController.getUserbyUsername);
router.post("/signup",validateRequestSchema(signUpSchema), userController.signUp);
router.post("/verification-code", validateRequestSchema(requestVerificationcODESchema), userController.requestEmailverificationCode);
router.post("/reset-password-code", validateRequestSchema(requestVerificationcODESchema), userController.requestResetPasswordCode);
router.post("/reset-password/verify", validateRequestSchema(resetPasswordSchema), userController.resetPassword);
router.post("/login", passport.authenticate("local"), (req, res) => 
    res.status(200).json(req.user));
router.get("/login/google", setSessionReturnTo, passport.authenticate("google"));
router.get("/oauth2/redirect/google",passport.authenticate("google",{
    successReturnToOrRedirect: env.WEBSITE_URL ,
    keepSessionInfo:true
   
}));
router.get("/login/github",setSessionReturnTo, passport.authenticate("github"));
router.get("/oauth2/redirect/github",passport.authenticate("github",{
    successReturnToOrRedirect: env.WEBSITE_URL ,
    keepSessionInfo:true
}));
router.post("/logout", userController.logOut);
router.patch("/me", requiresAuth, profilePicUpload.single("profilePic"),validateRequestSchema(updateUserSchema), userController.updateUser);

export default router;