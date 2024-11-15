import express from "express";
import passport from "passport";
import * as userController from "../controllers/user";



const router = express.Router();
router.get("/me", userController.getAuthenticatedUser);
router.post("/signup", userController.signUp);
router.post("/login", passport.authenticate("local"), (req, res) => 
    res.status(200).json(req.user));
router.post("/logout", userController.logOut);

export default router;