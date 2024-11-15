import useSwr from "swr";
import * as UsersApi from '@/network/api/user';

export default function useAuthenticatedUser() {
    const {data, isLoading, error, mutate}= useSwr("user", UsersApi.getAuthenticatedUser);
 
    return {
        user: data,
        userloading: isLoading,
        userLoadingError: error,
        mutateUser: mutate,
    }
}