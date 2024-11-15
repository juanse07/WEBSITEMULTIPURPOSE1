import useSwr from "swr";
import * as UsersApi from '@/network/api/user';
import { UnauthorizedError } from "@/network/api/http-errors";

export default function useAuthenticatedUser() {
    const {data, isLoading, error, mutate}= useSwr("user", 
        async () => {
            try {
                return await UsersApi.getAuthenticatedUser();
                
            } catch (error) {
                if (error instanceof UnauthorizedError) {
                    return null;
                }else {
                    throw error;
                }
                
            }
        }
    );
 
    return {
        user: data,
        userloading: isLoading,
        userLoadingError: error,
        mutateUser: mutate,
    }
}