import express from "express";
import * as userController from "../controllers/user";
import passport from "passport";


const router = express.Router();

router.post("/signup", userController.signUp);
router.post("/login", passport.authenticate("local"), (req, res) => 
    res.status(200).json(req.user));

export default router;