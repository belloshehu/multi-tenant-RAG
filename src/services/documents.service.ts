import axios from "axios";
import {
	IDocumentIndexingPayload,
	IDocumentIndexingResponseType,
	IDocumentListResponseType,
	IDocumentResponseType,
} from "../types/documents.types";
import { axiosInstance } from "../config/index.config";

export class DocumentServiceAPI {
	static getAllDocuments = async () => {
		const { data } = await axios.get<IDocumentListResponseType>(
			"/api/documents"
		);
		return data.data;
	};

	static getSingleDocument = async (document_id: number) => {
		const { data } = await axios.get("/api/documents/" + document_id);
		return data;
	};

	static deleteDocument = async ({ id }: { id: number }) => {
		const { data } = await axios.delete("/api/documents/" + id);
		return data.data;
	};

	// method to index document into vertor store
	static indexDocument = async ({
		payload,
	}: {
		payload: IDocumentIndexingPayload;
	}) => {
		const { data } = await axiosInstance.post<IDocumentIndexingResponseType>(
			"/api/documents/indexing",
			payload
		);
		return data;
	};

	static createDocument = async ({
		payload,
	}: {
		payload: {
			file: File;
			name: string;
			description?: string;
			tenant_id: number;
		};
	}) => {
		const formData = new FormData();
		formData.append("file", payload.file as any);
		formData.append("name", payload.name); // custom filename
		formData.append("description", payload?.description || ""); // custom filename
		formData.append("tenant_id", payload.tenant_id.toString());
		const { data } = await axios.post<IDocumentResponseType>(
			"/api/documents",
			formData,
			{
				headers: { "Content-Type": "multipart/form-data" },
			}
		);
		return data.data;
	};
}
