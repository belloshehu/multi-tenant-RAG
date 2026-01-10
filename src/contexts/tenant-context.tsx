"use client";

import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useState,
} from "react";
import { IDocumentType } from "../types/documents.types";
import { ITenantType } from "../types/tenants.types";

export type ContentType = "chat" | "tenants";
interface TenantContextType {
	selectedDocument: IDocumentType | null;
	updateSelectedDocument: (doc: IDocumentType) => void;
	tenant: ITenantType | null;
	selectTenant: (tenant: ITenantType) => void;
	content: ContentType; // determines what is displayed based on users' action
	changeContent: (content: ContentType) => void;
	toggleContent: () => void;
}

const TenantContext = createContext<TenantContextType | null>(null);

export const TenantProvider = ({ children }: { children: ReactNode }) => {
	const [selectedDoc, setSelectedDoc] = useState<IDocumentType | null>(null);
	const [tenant, setTenant] = useState<ITenantType | null>(null);
	const [content, setContent] = useState<ContentType>("tenants");

	const updateSelectedDocument = useCallback((doc: IDocumentType) => {
		if (doc) {
			setSelectedDoc(doc);
		}
	}, []);

	const selectTenant = useCallback((tenant: ITenantType) => {
		if (tenant) {
			setTenant(tenant);
		}
	}, []);

	const changeContent = useCallback(
		(content: ContentType) => {
			if (content) {
				setContent(content);
			}
		},
		[content]
	);

	const toggleContent = useCallback(() => {
		if (content === "chat") {
			setContent("tenants");
		} else {
			setContent("chat");
		}
	}, [content]);

	return (
		<TenantContext.Provider
			value={{
				updateSelectedDocument,
				selectedDocument: selectedDoc,
				selectTenant,
				tenant,
				content,
				changeContent,
				toggleContent,
			}}
		>
			{children}
		</TenantContext.Provider>
	);
};

export const useTenant = () => {
	const context = useContext(TenantContext);
	if (!context)
		throw new Error("useTenant hook must be used inside TenantProvider");

	return context as TenantContextType;
};
