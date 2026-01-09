// TENANTS:

import { supabase } from "../lib/supabase";
import { ITenantDto, ITenantType } from "../types/tenants.types";

export const getTenantsByAdmin = async (): Promise<ITenantType[] | null> => {
	const { data: tenants, error } = await supabase
		.from("tenants")
		.select("*, user(id, role)")
		.eq("user.role", "admin");

	if (error)
		throw new Error("Failed to fetch tenants by admin: " + error.message);
	return tenants;
};

export const getTenantsByUser = async (
	user_id: string
): Promise<ITenantType[] | null> => {
	let { data: tenants, error } = await supabase
		.from("tenants")
		.select("*")
		.eq("user_id", user_id);
	if (error) throw new Error("Failed to fetch tenants: " + error.message);
	return tenants;
};

export const getAllTenants = async (): Promise<ITenantType[] | null> => {
	let { data: tenants, error } = await supabase.from("tenants").select("*");
	if (error) throw new Error("Failed to fetch tenants: " + error.message);
	return tenants;
};

export const insertTenant = async ({
	tenantDto,
}: {
	tenantDto: ITenantDto;
}): Promise<ITenantType | null> => {
	let { data: tenant, error } = await supabase
		.from("tenants")
		.insert([tenantDto]);
	if (error) throw new Error("Failed to insert tenant: " + error.message);
	return tenant;
};

export const getTenantByName = async (
	name: string
): Promise<ITenantType[] | null> => {
	let { data: tenant, error } = await supabase
		.from("tenants")
		.select("*")
		.eq("name", name)
		.limit(1);
	if (error) throw new Error("Failed to fetch tenant: " + error.message);
	return tenant;
};
