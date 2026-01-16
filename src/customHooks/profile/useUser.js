import { useQuery } from '@tanstack/react-query';
import { getMyProfile,addProfilePic } from '@/apis/profile/getProfile';
import { useAuth } from "@/context/authContext";

export const useUser = () => {
   const { token } = useAuth();
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['my-profile'],
    queryFn: getMyProfile,
    enabled: !!token,
    staleTime: 1000 * 60 * 5, // 5 min cache
  });

  console.log("Fetched user profile data:", data);

  // Backend response ke hisaab se user object nikalna
  // Maan lo backend bhej raha hai: { success: true, user: {...} }
  const user = data || null;

  return {
    user,
    isLoading,
    isError,
    error,
    refetch
  };
};