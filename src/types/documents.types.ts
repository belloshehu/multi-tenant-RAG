import { ResponseType } from "./index.types";

export interface IDocumentType {
	id: number;
	name: string;
	description?: string;
	fileUrl: string;
	created_at?: string;
}

export interface IDocumentPayloadType {
	name: string;
	description?: string;
	fileUrl: string;
}

export interface IDocumentResponseType extends ResponseType<IDocumentType> {
	data: IDocumentType;
}

export interface IDocumentListResponseType
	extends ResponseType<IDocumentType[]> {
	data: IDocumentType[];
}
