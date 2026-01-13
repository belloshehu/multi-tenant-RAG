import { supabase } from "../lib/supabase";
import { IDocumentPayloadType, IDocumentType } from "../types/documents.types";

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

export const fetchDocument = async (
	id: number
): Promise<IDocumentType | null> => {
	let { data: document, error } = await supabase
		.from("document")
		.select("*")
		.eq("id", id)
		.limit(1)
		.single();
	if (error) throw new Error("Failed to insert documents: " + error.message);
	return document;
};

export const updateDocument = async ({
	documentDto,
	id,
}: {
	documentDto: IDocumentPayloadType;
	id: number;
}) => {
	let { data: document, error } = await supabase
		.from("document")
		.update(documentDto)
		.eq("id", id);
	if (error) throw new Error("Failed to update document: " + error.message);
	console.log(error);
	return document;
};

// Delete uploaded document instance
export const deleteDocument = async (
	id: number
): Promise<IDocumentType | null> => {
	let { data, error } = await supabase
		.from("document")
		.delete()
		.eq("id", id)
		.select("*")
		.limit(1)
		.single();
	if (error) throw new Error("Failed to delete document: " + error.message);
	return data;
};

// Delete embeddings and contents from vector db
export const unIndexDocument = async (
	tenant_id: number,
	document_id: number
) => {
	const { data, error } = await supabase
		.from("documents")
		.delete()
		.eq("metadata->>tenant_id", tenant_id)
		.eq("metadata->>document_id", document_id);
	if (error) throw new Error("Failed to unindex document: " + error.message);
	return data;
};
