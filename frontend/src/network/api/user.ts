import api from "@/network/axiosInstance";
import { User } from "@/models/user";
export async function getAuthenticatedUser(){
    const response = await api.get<User>("/users/me");
    return response.data;
}

interface SignUpalues{
    username: string;
    email: string;
    password: string;
}

export async function signup(credentials: SignUpalues){
    const response = await api.post<User>("/users/signup", credentials);
    return response.data;
    
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