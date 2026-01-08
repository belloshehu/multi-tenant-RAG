import axios from "axios";
import {
	ITenantPayloadType,
	ITenantResponseType,
	ITenantListResponseType,
} from "../types/tenants.types";

export class TenantServiceAPI {
	static getAllTenants = async () => {
		const { data } = await axios.get<ITenantListResponseType>("/api/tenants");
		return data.data;
	};

	static deleteTenant = async ({ id }: { id: number }) => {
		const { data } = await axios.delete("/api/tenants/" + id);
		return data.data;
	};

	static createTenant = async ({
		payload,
	}: {
		payload: ITenantPayloadType;
	}) => {
		try {
			console.log(payload);
			const { data } = await axios.post<ITenantResponseType>(
				"/api/tenants",
				payload
			);
			return data.data;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
}
