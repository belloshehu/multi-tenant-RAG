import axios from "axios";
import {
	IDocumentListResponseType,
	IDocumentResponseType,
} from "../types/documents.types";

export class DocumentServiceAPI {
	static getAllDocuments = async () => {
		const { data } = await axios.get<IDocumentListResponseType>(
			"/api/documents"
		);
		return data.data;
	};

	static deleteDocument = async ({ id }: { id: number }) => {
		const { data } = await axios.delete("/api/documents/" + id);
		return data.data;
	};

	static createDocument = async ({
		payload,
	}: {
		payload: { file: File; name: string; description?: string };
	}) => {
		const formData = new FormData();
		formData.append("file", payload.file as any);
		formData.append("name", payload.name); // custom filename
		formData.append("description", payload?.description || ""); // custom filename
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
