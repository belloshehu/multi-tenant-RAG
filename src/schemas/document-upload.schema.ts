import z from "zod";

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
const ACCEPTED_FILE_TYPES = ["application/pdf"];

export const documentUploadSchema = z.object({
	name: z.string().min(3, "Document too short"),
	description: z.string().optional(),
	file: z
		.custom<File>((file) => file instanceof File, {
			message: "Please upload a file",
		})
		.refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
			message: "Only PDF files are allowed",
		})
		.refine((file) => file.size <= MAX_FILE_SIZE, {
			message: "PDF size must be less than 3MB",
		}),
});

export type DocumentUploadSchema = z.infer<typeof documentUploadSchema>;
