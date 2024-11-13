export interface User {
    _id: string;
    username: string;
    email?: string;
    displayName?: string;
    about?: string;
    profilePicUrl?: string;
    // password: string;
    // googleId: string;
    // facebookId: string;
    // githubId: string;
    createdAt: string;
    updatedAt: string;
}