import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { jobApi } from "@/lib/axios";

export const useCreateCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData) => {
      // LocalStorage se token uthao
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

      const response = await jobApi.post("/company", formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
          // Token bhej diya header mein
          ...(token && { "Authorization": `Bearer ${token}` })
        },
        withCredentials: true,
      });
      return response.data;
    },
    onSuccess: (data) => {
      // List refresh karne ke liye query invalidate
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      toast.success(data.message || "Company registered successfully!");
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Failed to create company";
      toast.error(message);
    },
  });
};