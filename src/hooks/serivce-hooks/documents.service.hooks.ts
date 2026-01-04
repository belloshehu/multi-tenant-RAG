import { DocumentServiceAPI } from "@/src/services/documents.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Hook for Fetching all documents in client components
export const useGetAllDocuments = () => {
	return useQuery({
		queryFn: async () => DocumentServiceAPI.getAllDocuments(),
		queryKey: ["documents"],
	});
};

export const useCreateDocument = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: DocumentServiceAPI.createDocument,
		onSuccess() {
			toast.success("Created document successfully");
			queryClient.invalidateQueries({ queryKey: ["documents"] });
		},
		onError() {
			toast.error("Failed to create document");
		},
	});
};
