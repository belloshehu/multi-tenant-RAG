import z from "zod";

export const tenantSchema = z.object({
	name: z.string().min(3, "Name too short (minimum of 2 chars.)"),
	email: z.string().email("Enter valid email"),
	support_email: z.string().email("Enter valid support email"),
	logo: z.string().url("Enter a valid logo url"),
	site_url: z.string().url("Invalid website url"),
	description: z.string().min(5, "Too short (5 words minimum)."),
});

export type TenantSchemaType = z.infer<typeof tenantSchema>;
