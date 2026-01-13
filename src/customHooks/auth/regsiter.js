"use client";

import { useMutation } from "@tanstack/react-query";
import { registerUser }from "@/apis/auth/index";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useRegister = () => {
    const router = useRouter();
    return useMutation({
        mutationFn: registerUser,

        onError: (error) => {
            console.log("Status Code:", error.response?.status);
            console.log("Server Message:", error.response?.data);

            toast.error(error.response?.data?.message || "Registration failed.");
        },

        onSuccess: (data) => {
            console.log("Registration successful:", data);
            toast.success("Registration successful! Welcome aboard.");
            router.push("/login");
        }
    });
};

