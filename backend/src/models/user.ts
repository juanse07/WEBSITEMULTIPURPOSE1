import { Schema, InferSchemaType, model } from 'mongoose';

const userSchema = new Schema({
    username: { type: String, unique: true, sparse: true },
    email: { type: String, unique: true, sparse: true, select: false, required: true },
    displayName: { type: String},
    about: { type: String},
    profilePicUrl: { type: String},
    password: { type: String, select: false},
    googleId: {type: String, unique: true, sparse: true, select: false},
    facebookId: {type: String, unique: true, sparse: true, select: false},
    githubId: {type: String, unique: true, sparse: true, select: false},
    
},{timestamps:true});

userSchema.pre("validate", function(next){
    if(!this.email &&!this.googleId && !this.facebookId && !this.githubId )
        {
       return next(new Error("Email or Social Provider is required"));
    }
    next();
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);

