import { ResponseType } from "./index.types";
import { ITenantType } from "./tenants.types";

export interface IDocumentType {
	id: number;
	name: string;
	description?: string;
	fileUrl: string;
	created_at?: string;
	tenant?: ITenantType;
	tenant_id: number;
	indexed?: boolean;
	enabled?: boolean;
}

export interface IDocumentPayloadType {
	name: string;
	description?: string;
	fileUrl: string;
	tenant_id: number;
	indexed?: boolean;
	enabled?: boolean;
}

export interface IDocumentResponseType extends ResponseType<IDocumentType> {
	data: IDocumentType;
}

export interface IDocumentIndexingResponseType extends ResponseType<boolean> {
	data: boolean;
}

export interface IDocumentListResponseType
	extends ResponseType<IDocumentType[]> {
	data: IDocumentType[];
}

export interface IDocumentIndexingPayload {
	fileName: string;
	tenant_id: number;
	document_id: number;
}
