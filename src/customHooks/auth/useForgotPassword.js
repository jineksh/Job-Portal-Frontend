import { useMutation } from '@tanstack/react-query';
import { toast } from "sonner";
import { authApi } from '@/lib/axios';

export const useForgotPassword = () => {
    return useMutation({
        mutationFn: async (emailData) => {
            // emailData check karo: agar {email: '...'} hai toh sahi hai
            // Axios.put(url, data, config) leta hai
            const response = await authApi.put('auth/forgot-password', emailData);
            
            // Axios mein response.json() nahi hota, data seedha response.data mein hota hai
            return response.data;
        },
        onSuccess: () => {
            toast.success("Reset link sent to your email!");
        },
        onError: (error) => {
            // Axios errors handle karne ka tareeka
            const message = error.response?.data?.message || "Server error";
            toast.error(message);
        }
    });
};