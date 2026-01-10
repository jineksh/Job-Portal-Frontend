import { Loader2 } from "lucide-react";

export const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full gap-4">
      <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
      <p className="text-gray-500 font-medium animate-pulse">{message}</p>
    </div>
  );
};