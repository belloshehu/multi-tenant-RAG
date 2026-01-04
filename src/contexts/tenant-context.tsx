"use client";

import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useState,
} from "react";
import { IDocumentType } from "../types/documents.types";

interface TenantContextType {
	selectedDocument: IDocumentType | null;
	updateSelectedDocument: (doc: IDocumentType) => void;
}

const TenantContext = createContext<TenantContextType | null>(null);

export const TenantProvider = ({ children }: { children: ReactNode }) => {
	const [selectedDoc, setSelectedDoc] = useState<IDocumentType | null>(null);

	const updateSelectedDocument = useCallback((doc: IDocumentType) => {
		if (doc) {
			setSelectedDoc(doc);
		}
	}, []);

	return (
		<TenantContext.Provider
			value={{ updateSelectedDocument, selectedDocument: selectedDoc }}
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
