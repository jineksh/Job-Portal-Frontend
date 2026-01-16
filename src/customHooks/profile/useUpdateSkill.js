import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from "@/lib/axios";
import { toast } from 'sonner';

export const useUpdateSkill = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (updatedSkills) => {
            // UpdatedSkills mein array of skills jayega
            const response = await authApi.post('/user/add-skills', { skills: updatedSkills });
            return response.data.data;
        },
        onSuccess: () => {
            toast.success("Skill added successfully!");
            // Isse list automatically update ho jayegi bina refresh kiye
            queryClient.invalidateQueries({ queryKey: ['my-profile'] });
            queryClient.invalidateQueries({ queryKey: ['skills'] });
        },
        onError: (error) => {
            const message = error.response?.data?.message || "Failed to add skill";
            toast.error(message);
        }
    });
};