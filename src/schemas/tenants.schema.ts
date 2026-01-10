import z from "zod";

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 3MB
const ACCEPTED_FILE_TYPES = ["image/png", "image/jpeg", "image/jpg"];
export const tenantSchema = z.object({
	name: z.string().min(3, "Name too short (minimum of 2 chars.)"),
	email: z.string().email("Enter valid email"),
	support_email: z.string().email("Enter valid support email"),
	logo: z
		.custom<File>((file) => file instanceof File, {
			message: "Please upload a image.",
		})
		.refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
			message: "Only image files are allowed",
		})
		.refine((file) => file.size <= MAX_FILE_SIZE, {
			message: "Logo size must be less than 1MB or less",
		}),
	site_url: z.string().url("Invalid website url"),
	description: z.string().min(5, "Too short (5 words minimum)."),
});

export type TenantSchemaType = z.infer<typeof tenantSchema>;
