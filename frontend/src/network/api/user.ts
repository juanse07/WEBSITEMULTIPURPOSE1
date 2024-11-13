import api from "@/network/axiosInstance";
import { User } from "@/models/user";
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
