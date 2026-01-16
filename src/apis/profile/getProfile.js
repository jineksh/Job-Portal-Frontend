
import { authApi } from "@/lib/axios";

// Request Interceptor: Har request se pehle token add karega
authApi.interceptors.request.use(
    (config) => {
        // LocalStorage se token nikalo
        const token = localStorage.getItem('token'); 
        
        if (token) {
            // Header mein 'Authorization' set karo
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Ab tera getMyProfile ek dum clean rahega
export const getMyProfile = async () => {
    const res = await authApi.get('/user/my-profile');
    // Agar tera backend { success: true, user: {...} } bhej raha hai:
    return res.data.data; 
};

export const addProfilePic = async (formData) => {
    const res = await authApi.post('/user/add-profilePic', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data.data;
};


export const updateProfile = async (payload) => {
   const res = await authApi.patch('/user/profile', payload);
    return res.data.data;
};

export const updateResume = async (formData) => {
    // Axios automatically sets 'Content-Type': 'multipart/form-data' when it sees FormData
    const res = await authApi.patch('/user/update-resume', formData); 
    return res.data; 
};