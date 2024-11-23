import express from "express";
import passport from "passport";
import * as userController from "../controllers/user";
import requiresAuth from "../middlewares/requiresAuth";
import validateRequestSchema from "../middlewares/validateRequestSchema";
import { signUpSchema } from "../validation/users";
import { profilePicUpload } from "../middlewares/imageUpload";
import { updateUserSchema } from "../validation/users";


const router = express.Router();
router.get("/me",requiresAuth, userController.getAuthenticatedUser);
router.get("/profile/:username", userController.getUserbyUsername);
router.post("/signup",validateRequestSchema(signUpSchema), userController.signUp);
router.post("/login", passport.authenticate("local"), (req, res) => 
    res.status(200).json(req.user));
router.post("/logout", userController.logOut);
router.patch("/me", requiresAuth, profilePicUpload.single("profilePic"),validateRequestSchema(updateUserSchema), userController.updateUser);

export default router;