import { supabase } from "../lib/supabase";
import { IDocumentPayloadType } from "../types/documents.types";

// DOCUMENTS
export const getAllDocuments = async () => {
	let { data: document, error } = await supabase.from("document").select("*");
	if (error) throw new Error("Failed to fetch documents: " + error.message);
	return document;
};

export const insertDocument = async ({
	documentDto,
}: {
	documentDto: IDocumentPayloadType;
}) => {
	let { data: document, error } = await supabase
		.from("document")
		.insert([documentDto]);
	if (error) throw new Error("Failed to insert documents: " + error.message);
	return document;
};
