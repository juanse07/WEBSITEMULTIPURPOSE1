import api from "@/network/axiosInstance";
import { User } from "@/models/user";
export async function getAuthenticatedUser(){
    const response = await api.get<User>("/users/me");
    return response.data;
}

export async function getUserByUsername(username: string){
    const response = await api.get<User>(`/users/profile/${username}`);
    return response.data;
}

interface SignUpalues{
    username: string;
    email: string;
    password: string;
    verificationCode: string;
}

export async function signup(credentials: SignUpalues){
    const response = await api.post<User>("/users/signup", credentials);
    return response.data;
    
}
export async function requestEmailVerificationCode(email: string){
    await api.post("/users/verification-code", { email });
}

interface LoginValues{
    username: string;
    password: string;
}

export async function login(credentials: LoginValues){
    const response = await api.post<User>("/users/login", credentials);
    return response.data;
}

export async function logout(){
    await api.post("/users/logout");
}

interface UpdateUserValues{
    username?: string;
    displayName?: string;
    about?: string;
    profilePic?: File;
}

export async function updateUser(input: UpdateUserValues){
    const formData = new FormData();
    Object.entries(input).forEach(([key, value]) => {
        if(value !== undefined)
            formData.append(key, value);

        console.log('Form data being sent:', formData);
       
        

    });
    const response = await api.patch<User>("/users/me", formData);
   
    console.log('Response received:', response.data);
    
    return response.data;
    
   
}