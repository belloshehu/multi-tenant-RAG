import { TenantServiceAPI } from "@/src/services/tenants.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Hook for Fetching all tenants invoked in client components
export const useGetAllTenants = () => {
	return useQuery({
		queryFn: async () => TenantServiceAPI.getAllTenants(),
		queryKey: ["tenants"],
	});
};

// Hook for creating a tenant to be used in a form
export const useCreateTenant = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: TenantServiceAPI.createTenant,
		onSuccess() {
			toast.success("Created tenant successfully");
			queryClient.invalidateQueries({ queryKey: ["tenant"] });
		},
		onError() {
			toast.error("Failed to create tenant");
		},
	});
};
