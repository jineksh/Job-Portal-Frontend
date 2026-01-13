import { authApi } from "@/lib/axios";

export const registerUser = async (payload) => {
    const { data } = await authApi.post("/auth/register", payload);
   
    return data;
};


export const loginUser = async (payload) => {
    const { data } = await authApi.post("/auth/login", payload);
    return data;
};
