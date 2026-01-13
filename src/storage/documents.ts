/*
 * Handle uploading and downloading for documents
 *
 */

import { supabase } from "../lib/supabase";

const DOCUMENT_BUCKET = "documents";
const DOCUMENT_FOLDER = "public";

export const getPublicPdfUrl = (path: string) => {
	const { data } = supabase.storage.from(DOCUMENT_BUCKET).getPublicUrl(path);

	return data.publicUrl;
};

export const uploadFile = async (file: File, fileName: string) => {
	const filePath = `${DOCUMENT_FOLDER}/${fileName}`;
	const { data, error } = await supabase.storage
		.from(DOCUMENT_BUCKET)
		.upload(filePath, file, {
			contentType: "application/pdf",
			upsert: false,
		});

	if (error) throw new Error("Failed to upload file: " + error.message);
	return data;
};

export const downloadFile = async (fileName: string) => {
	// Use the JS library to download a file.
	const filePath = `${DOCUMENT_FOLDER}/${fileName}`;
	const { data, error } = await supabase.storage
		.from(DOCUMENT_BUCKET)
		.download(filePath);
	if (error) throw new Error("Failed to download file: " + error.message);
	const buffer = Buffer.from(await data.arrayBuffer());
	return { buffer, fileName };
};

export const deleteFile = async (fileName: string) => {
	const filePath = `${DOCUMENT_FOLDER}/${fileName}`;
	const { data, error } = await supabase.storage
		.from(DOCUMENT_BUCKET)
		.remove([filePath]);
	if (error) throw error;
	return data;
};

export const getAllFiles = async () => {
	const { data, error } = await supabase.storage
		.from("avatars")
		.list("folder", {
			limit: 100,
			offset: 0,
			sortBy: { column: "name", order: "asc" },
		});

	if (error) throw new Error("Failed to fetch all files: " + error.message!);
	return data;
};

export const checkFileExistence = async (fileName: string) => {
	const filePath = `${DOCUMENT_FOLDER}/${fileName}`;
	const { data, error } = await supabase.storage
		.from("avatars")
		.exists(filePath);
	if (error)
		throw new Error("Failed to check file existence: " + error.message);
	return data;
};
