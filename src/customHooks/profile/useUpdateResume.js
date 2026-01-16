import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateResume } from '../../apis/profile/getProfile';
import { toast } from "sonner";

export const useUpdateResume = () => {
    const queryClient = useQueryClient();

    const updateResumeMutation = useMutation({
        mutationFn: (formData) => updateResume(formData),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['my-profile'] });
            toast.success(data?.message || "Resume updated successfully!");
        },
        onError: (error) => {
            const msg = error.response?.data?.message || "Resume upload failed!";
            toast.error(msg);
        }
    });

    return {
        updateResumeMutation // Sirf mutation object return kar raha hoon
    };
};