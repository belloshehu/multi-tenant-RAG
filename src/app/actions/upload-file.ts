"use server";
import fs from "node:fs/promises";
import { revalidatePath } from "next/cache";
import { validateFile } from "@/src/lib/validate-file";
import * as storage from "@/src/storage/documents";
import { toast } from "sonner";
import { formatFileName } from "@/src/lib/format-filename";
import path from "node:path";

const UPLOAD_DIR = path.join(process.cwd(), "public/uploads");

export async function uploadFile(formData: FormData) {
	try {
		const file = formData.get("file") as File;
		const fileName = formData.get("name") as string;
		const arrayBuffer = await file.arrayBuffer();
		const buffer = new Uint8Array(arrayBuffer);

		// check if it ends with .pdf
		const isPdf = validateFile(fileName as string, ".pdf");
		const formattedFileName = isPdf ? fileName : fileName + ".pdf";
		await fs.writeFile(
			`./public/uploads/${formattedFileName || file.name}`,
			buffer
		);

		// upload to supabase storage bucket
		const result = await storage.uploadFile(file, formattedFileName);
		const publicUrl = storage.getPublicPdfUrl(result.path);
		revalidatePath("/");
		return publicUrl;
	} catch (error: any) {
		console.error(error);
		throw new Error("Failed to upload file:", error);
	}
}

export async function getUploadedFiles() {
	const files = await fs.readdir("./public/uploads");
	const pdfFiles = files
		.filter((file) => file.endsWith(".pdf"))
		.map((file) => `/uploads/${file}`);
	return pdfFiles;
}

export async function deleteUploadedFile(fileName: string) {
	try {
		const formattedFileName = formatFileName(fileName, 100) as string;

		const files = await fs.readdir(UPLOAD_DIR);
		const fileExists = files.includes(formattedFileName);

		// remove from server if exists
		if (fileExists) {
			const filePath = path.join(UPLOAD_DIR, formattedFileName);
			await fs.rm(filePath);
			toast.success("File deleted file from server");
		}
		await storage.deleteFile(fileName);
		toast.success("File deleted");
		return true;
	} catch (error: any) {
		toast.error("Failed to delete file from storage");
		throw new Error("Failed to delete file: " + error?.message);
	}
}
