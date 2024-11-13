import mongoose from "mongoose";

declare global {
    namespace Express {
        interface User {
            _id: mongoose.Types.ObjectId;
            // username: string;
            // email: string;
            // displayName: string;
            // about: string;
            // profilePicUrl: string;
            // googleId: string;
            // facebookId: string;
            // githubId: string;
        }
    }
}