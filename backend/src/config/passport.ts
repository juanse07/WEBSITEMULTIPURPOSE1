import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import UserModel from '../models/user';
import { mongo } from "mongoose";

passport.serializeUser((user: any, cb) => {

    cb(null, user._id);
});

passport.deserializeUser((id: string, cb) => {
    cb(null,{_id: new mongo.ObjectId(id)});
});
passport.use(new LocalStrategy(async (username, password, cb) => {
    try {
        const existingUser = await UserModel.findOne({username})
        .select("+email +password")
        .exec();

        if(!existingUser || !existingUser.password){
            return cb(null, false, {message: 'Invalid username or password'});

        }
        const passwordMatches = await bcrypt.compare(password, existingUser.password);
        
        if(!passwordMatches){
            return cb(null, false, {message: 'Invalid username or password'});
        }
    
        const user =  existingUser.toObject();

        delete user.password;

        return cb(null, user);
    } catch (error) {
            cb(error);
        }

}));