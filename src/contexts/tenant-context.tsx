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

interface TenantContextType {
	selectedDocument: IDocumentType | null;
	updateSelectedDocument: (doc: IDocumentType) => void;
	tenant: ITenantType | null;
	selectTenant: (tenant: ITenantType) => void;
}

const TenantContext = createContext<TenantContextType | null>(null);

export const TenantProvider = ({ children }: { children: ReactNode }) => {
	const [selectedDoc, setSelectedDoc] = useState<IDocumentType | null>(null);
	const [tenant, setTenant] = useState<ITenantType | null>(null);

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

	return (
		<TenantContext.Provider
			value={{
				updateSelectedDocument,
				selectedDocument: selectedDoc,
				selectTenant,
				tenant,
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
