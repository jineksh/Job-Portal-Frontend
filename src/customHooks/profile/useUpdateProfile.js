import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@/apis/profile/getProfile";
import { toast } from "sonner";
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation({
    // Isse async banayein aur console lagayein
    mutationFn: async (payload) => {
      console.log("1. API Call Start ho rahi hai...", payload); 
      const response = await updateProfile(payload);
      console.log("2. API Response aa gaya:", response);
      return response;
    },
    onSuccess: (data) => {
      console.log("3. Success trigger hua!");
      queryClient.invalidateQueries({ queryKey: ['my-profile'] });
      toast.success("Profile updated successfully!");
    },
    onError: (error) => {
      console.error("Mutation Error:", error);
      toast.error(error.response?.data?.message || "Update fail ho gaya!");
    }
  });

  return { updateProfileMutation };
};