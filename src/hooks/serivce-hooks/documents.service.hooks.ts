import { DocumentServiceAPI } from "@/src/services/documents.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

// Hook for Fetching all documents in client components
export const useGetAllDocuments = () => {
	return useQuery({
		queryKey: ["documents"],
		queryFn: async () => DocumentServiceAPI.getAllDocuments(),
	});
};

// Hook for indexing document to vector DB.
export const useIndexDocument = (tenant_id: number) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: DocumentServiceAPI.indexDocument,
		onSuccess(data) {
			toast.success(data?.message || "Document indexed successfully");
			queryClient.invalidateQueries({
				queryKey: ["documents"],
			});
			queryClient.invalidateQueries({
				queryKey: ["tenant", tenant_id],
			});
		},
		onError(error: AxiosError<{ error: string }>) {
			toast.error(error?.response?.data?.error || "Failed to index document");
		},
	});
};

export const useGetSingleDocument = (id: number) => {
	return useQuery({
		queryKey: ["documents", id],
		queryFn: () => DocumentServiceAPI.getSingleDocument(id),
	});
};

// Hook for creating document
export const useCreateDocument = (tenant_id: number) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: DocumentServiceAPI.createDocument,
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ["documents"],
			});
			queryClient.invalidateQueries({
				queryKey: ["tenant", tenant_id],
			});
			toast.success("Created document successfully");
		},
		onError(error: AxiosError<{ error: string }>) {
			toast.error(error?.response?.data?.error || "Failed to create document");
		},
	});
};

// Hook for delete document: Both deleting of the document field and from the vector db occur togather.
export const useDeleteDocument = (document_id: number, tenant_id: number) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: DocumentServiceAPI.deleteDocument,
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ["documents", document_id],
			});
			queryClient.invalidateQueries({
				queryKey: ["tenant", tenant_id],
			});
			toast.success("Deleted document successfully");
		},
		onError(error: AxiosError<{ error: string }>) {
			toast.error(error?.response?.data?.error || "Failed to delete document");
		},
	});
};
