import axios, { AxiosError } from "axios";
import {
	ITenantPayloadType,
	ITenantResponseType,
	ITenantListResponseType,
} from "../types/tenants.types";
import { axiosInstance } from "../config/index.config";

export class TenantServiceAPI {
	static getAllTenants = async () => {
		const { data } = await axios.get<ITenantListResponseType>(
			"http://localhost:3000/api/tenants"
		);
		return data.data;
	};

	static getUserTenants = async () => {
		const { data } = await axiosInstance.get<ITenantListResponseType>(
			"/api/user/tenants"
		);
		return data.data;
	};
	static deleteTenant = async ({ id }: { id: number }) => {
		const { data } = await axiosInstance.delete("/api/tenants/" + id);
		return data.data;
	};

	static createTenant = async ({
		payload,
	}: {
		payload: ITenantPayloadType;
	}) => {
		const formData = new FormData();
		formData.set("logo", payload.logo);
		formData.set("name", payload.name);
		formData.set("description", payload.description || "");
		formData.set("email", payload.email);
		formData.set("support_email", payload.support_email);
		formData.set("user_id", payload.user_id);
		formData.set("site_url", payload.site_url);

		const { data } = await axios.post<ITenantResponseType>(
			"/api/tenants",
			formData
		);
		return data.data;
	};
}
