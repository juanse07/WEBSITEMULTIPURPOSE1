import express from "express";
import passport from "passport";
import * as userController from "../controllers/user";
import requiresAuth from "../middlewares/requiresAuth";
import validateRequestSchema from "../middlewares/validateRequestSchema";
import { signUpSchema } from "../validation/users";



const router = express.Router();
router.get("/me",requiresAuth, userController.getAuthenticatedUser);
router.post("/signup",validateRequestSchema(signUpSchema), userController.signUp);
router.post("/login", passport.authenticate("local"), (req, res) => 
    res.status(200).json(req.user));
router.post("/logout", userController.logOut);

export default router;