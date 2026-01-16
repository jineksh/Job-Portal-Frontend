'use-client'

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser }from "@/apis/auth/index";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";


export const useLogin = () => {
    const {login,logout} = useAuth();
    const queryClient = useQueryClient();
    const router = useRouter();
    return useMutation({
        mutationFn: loginUser,
        onError: (error) => {
            console.log("Status Code:", error.response?.status);
            console.log("Server Message:", error.response?.data);
            toast.error(error.response?.data?.message || "Login failed.");
        },
        onSuccess: (data) => {
            console.log("Login successful:", data);
            toast.success("Login successful! Welcome back.");
            login(data.data.user, data.data.token);
            queryClient.invalidateQueries({ queryKey: ["my-profile"] });
            setTimeout(() => router.push("/"), 1500);
        }
    });
}