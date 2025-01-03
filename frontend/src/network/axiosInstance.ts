

import axios from 'axios';
import { BadRequestError, UnauthorizedError, NotFoundError, conflictError, ToomanyrequestError } from './api/http-errors';



const axiosInstance = axios.create({
   baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
   
    timeout:5000,
    withCredentials: true,
   

});
axiosInstance.interceptors.response.use(null, error => {
    if (axios.isAxiosError(error) ) {
        const errorMessage = error.response?.data?.error;

        switch (error.response?.status) {
            case 400:
                throw new BadRequestError(errorMessage);
               
            case 401:
                throw new UnauthorizedError(errorMessage);
                
            case 404:
                throw new NotFoundError(errorMessage);
                
            case 409:
                throw new conflictError(errorMessage);
                
            case 429:
                throw new ToomanyrequestError(errorMessage);
                
            
        }
    }
    throw error;
},);
export default axiosInstance;