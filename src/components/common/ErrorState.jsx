import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ErrorState = ({ 
  message = "Something went wrong while fetching data.", 
  refetch 
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full p-6 text-center">
      <div className="bg-red-50 p-4 rounded-full mb-4">
        <AlertCircle className="h-10 w-10 text-red-500" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900">Oops! Error</h3>
      <p className="text-gray-500 max-w-xs mt-2 mb-6">{message}</p>
      
      {refetch && (
        <Button 
          onClick={() => refetch()} 
          variant="outline" 
          className="gap-2 border-red-200 hover:bg-red-50 text-red-600"
        >
          <RefreshCcw size={16} /> Try Again
        </Button>
      )}
    </div>
  );
};