import { useQuery } from "@tanstack/react-query";
import { jobApi } from "@/lib/axios";

export const useGetCompanies = () => {
  return useQuery({
    queryKey: ["companies"], // Ye key important hai invalidation ke liye
    queryFn: async () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      
      const response = await jobApi.get("/company", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      
      // Backend ke response structure ke hisab se check kar lena (response.data.companies ya data)
      return response.data.companies || response.data.data || [];
    },
    // Sirf recruiter ke liye hi ye API chalni chahiye
    enabled: typeof window !== "undefined" && !!localStorage.getItem("token"),
  });
};