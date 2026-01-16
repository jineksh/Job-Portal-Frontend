import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addProfilePic } from '../../apis/profile/getProfile';
import { toast } from "sonner";

export const useProfileActions = () => {
  const queryClient = useQueryClient();

  const uploadPicMutation = useMutation({
    mutationFn: addProfilePic,
    onSuccess: () => {
      // Isse 'my-profile' wala data refresh ho jayega
      queryClient.invalidateQueries({ queryKey: ['my-profile'] });
      toast.success("Profile picture updated successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Upload fail ho gaya bhai!");
    }
  });

  return { uploadPicMutation };
};