import { RequestHandler } from "express";
import UserModel from "../models/user";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import assertIsDefined from "../utils/assertIsDefined";
import { RequestVerificationCodeBody, SignUpBody, UpdateUserBody } from "../validation/users";
import sharp from "sharp";
import env from "../env";
import path from "path";
import crypto from "crypto";
import EmailVerificationToken from "../models/email-verification-token";
import * as EMAIL from "../utils/email";


export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    const authenticatedUser = req.user;
    try {
        assertIsDefined(authenticatedUser);
        
        const user = await UserModel.findById(authenticatedUser._id).select("+email").exec();/// observar esta linea porque deberia estar dentro del if
        res.status(200).json(user);
    } catch (error) {
    next(error);
  
}
}

export const getUserbyUsername: RequestHandler =async (req, res, next) => {
    try {
        const user = await UserModel.findOne({username: req.params.username}).exec();
        if(!user){
            throw createHttpError(404, 'User not found');
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}


export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {
const { username, email, password: passwordRaw, verificationCode } = req.body;

try{
    const existingUserName = await UserModel.findOne({username})
    .collation({locale: 'en', strength: 2})
     .exec();
    if(existingUserName){
        throw createHttpError(409, 'Username already exists');
    
    }
    const emailVerificationToken = await EmailVerificationToken.findOne({email, verificationCode}).exec();
    if(!emailVerificationToken){
        throw createHttpError(400, 'Invalid verification code');
    } else{
        await EmailVerificationToken.deleteOne();
    }
    const passwordHashed = await bcrypt.hash(passwordRaw, 10);

    const result = await UserModel.create({
        username,
        displayName: username,
        email,
        password: passwordHashed,
    });

    const newUser = result.toObject();

    delete newUser.password;
    req.logIn(newUser, error => {
        if(error)
           throw error;
        res.status(201).json(newUser);
    });
    
    
} catch(error){
    next(error);
}
}    
export const requestEmailverificationCode: RequestHandler<unknown, unknown, RequestVerificationCodeBody, unknown> = async (req, res, next) => {

    const {email} = req.body;
    try{
        const existingEmail = await UserModel.findOne({email})
        .collation({locale: 'en', strength: 2})
            .exec();
        if(existingEmail){
            throw createHttpError(409, 'Email already exists. Please log in instead');
        }
        const verificationCode = crypto.randomInt(100000, 999999).toString();
        await EmailVerificationToken.create({email,verificationCode});
        await EMAIL.sendVerificationCode(email, verificationCode);
        res.sendStatus(200);

         
    }catch(error){
        next(error);
    }

};

export const logOut: RequestHandler = (req, res, next) => {
    req.logOut(error => {
        if (error) throw error;
       res.sendStatus(200); 
    });
}

export const updateUser: RequestHandler<unknown, unknown, UpdateUserBody, unknown> = async (req, res, next) => {
const { username, displayName, about } = req.body;
const profilePic = req.file;
const profilePicUploadPath = path.join(__dirname, '..', 'uploads', 'profile-pictures');
const authenticatedUser = req.user;
    try {
        assertIsDefined(authenticatedUser);

        if (username) {
            const existingUserName = await UserModel.findOne({username})
            .collation({locale: 'en', strength: 2})
             .exec();
            if(existingUserName){
                throw createHttpError(409, 'Username already exists');
            
            }
        }

        let profilePicDestiny: string | undefined = undefined;
        if(profilePic){
            profilePicDestiny = "/uploads/profile-pictures/" + authenticatedUser._id +".png";///original
       
            await sharp(profilePic.buffer)
            .resize(500, 500,{withoutEnlargement: true})
            .toFile("./" + profilePicDestiny); 

           
        }
        const updatedUser = await UserModel.findByIdAndUpdate(authenticatedUser._id, {

            $set: {
                ...(username && {username}),
                ...(displayName && {displayName}),
                ...(about && {about}),
                ...(profilePic && {profilePicUrl: env.SERVER_URL + profilePicDestiny + "?lastUpdated" + Date.now()}),

            }
        }, {new: true}).exec();

        res.status(200).json(updatedUser);

        console.log('File received:', req.file);
        console.log('Updated user:', updatedUser);

      
    } catch (error) {
        next(error);
    }
}
