// TENANTS:

import { supabase } from "../lib/supabase";
import { ITenantPayloadType, ITenantType } from "../types/tenants.types";

export const getAllTenants = async (): Promise<ITenantType[] | null> => {
	let { data: tenants, error } = await supabase.from("tenants").select("*");
	if (error) throw new Error("Failed to fetch tenants: " + error.message);
	return tenants;
};

export const insertTenant = async ({
	tenantDto,
}: {
	tenantDto: ITenantPayloadType;
}): Promise<ITenantType | null> => {
	let { data: tenant, error } = await supabase
		.from("tenants")
		.insert([tenantDto]);
	if (error) throw new Error("Failed to insert tenant: " + error.message);
	return tenant;
};
