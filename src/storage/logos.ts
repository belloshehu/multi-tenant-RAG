/*
 * Handle uploading and downloading for logos
 *
 */

import { supabase } from "../lib/supabase";

const LOGO_BUCKET = "logos";
const LOGO_FOLDER = "public";

export const getPublicPdfUrl = (path: string) => {
	const { data } = supabase.storage.from(LOGO_BUCKET).getPublicUrl(path);

	return data.publicUrl;
};

export const uploadLogo = async (file: File, fileName: string) => {
	const filePath = `${LOGO_FOLDER}/${fileName}`;
	const { data, error } = await supabase.storage
		.from(LOGO_BUCKET)
		.upload(filePath, file, {
			contentType: "image/*",
			upsert: false,
		});

	if (error) throw new Error("Failed to upload logo: " + error.message);
	return data;
};

export const downloadLogo = async (fileName: string) => {
	// Use the JS library to download a file.
	const filePath = `${LOGO_FOLDER}/${fileName}`;
	const { data, error } = await supabase.storage
		.from(LOGO_BUCKET)
		.download(filePath);
	if (error) throw new Error("Failed to download logo: " + error.message);
	return data;
};

export const deleteLogo = async (fileName: string) => {
	const filePath = `${LOGO_FOLDER}/${fileName}`;
	const { data, error } = await supabase.storage
		.from(LOGO_BUCKET)
		.remove([filePath]);
	if (error) throw new Error("Failed to delete file:" + error.message);
	return data;
};

export const getAllLogos = async () => {
	const { data, error } = await supabase.storage.from("logos").list("folder", {
		limit: 100,
		offset: 0,
		sortBy: { column: "name", order: "asc" },
	});

	if (error) throw new Error("Failed to fetch all files: " + error.message!);
	return data;
};

export const checkFileExistence = async (fileName: string) => {
	const filePath = `${LOGO_FOLDER}/${fileName}`;
	const { data, error } = await supabase.storage.from("logos").exists(filePath);
	if (error)
		throw new Error("Failed to check file existence: " + error.message);
	return data;
};
