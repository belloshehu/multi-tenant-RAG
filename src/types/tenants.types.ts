import { IDocumentType } from "./documents.types";
import { ResponseType } from "./index.types";

export interface ITenantType {
	id: number;
	name: string;
	description?: string;
	site_url: string;
	logo: string;
	user_id: string;
	email: string;
	support_email: string;
	verified: boolean;
	active: boolean;
	created_at?: string;
	documents?: IDocumentType[];
}

export interface ITenantPayloadType {
	name: string;
	description?: string;
	site_url: string;
	logo: File | string;
	email: string;
	support_email: string;
	user_id: string;
}

export interface ITenantDto extends ITenantPayloadType {
	logo: string;
}
export interface ITenantResponseType extends ResponseType<ITenantType> {
	data: ITenantType;
}

export interface ITenantListResponseType extends ResponseType<ITenantType[]> {
	data: ITenantType[];
}
