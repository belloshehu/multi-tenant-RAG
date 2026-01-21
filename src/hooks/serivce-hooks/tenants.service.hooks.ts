import { TenantServiceAPI } from "@/src/services/tenants.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

// Hook for Fetching all tenants invoked in client components
export const useGetAllTenants = () => {
	return useQuery({
		queryFn: async () => TenantServiceAPI.getAllTenants(),
		queryKey: ["tenants"],
	});
};

export const useGetTenantById = (id: number) => {
	return useQuery({
		queryFn: async () => TenantServiceAPI.getTenantById(id),
		queryKey: ["tenant", id],
	});
};

// Hook for creating a tenant to be used in a form
export const useCreateTenant = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: TenantServiceAPI.createTenant,
		onSuccess() {
			toast.success("Created tenant successfully");
			queryClient.invalidateQueries({ queryKey: ["tenants"] });
		},
		onError(error: any) {
			const err = error as AxiosError<{ error: string }>;
			toast.error(`Error creating tenant: ${err.response?.data.error}`);
		},
	});
};
