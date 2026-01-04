"use client";
import { Loader, MoreVertical } from "lucide-react";
import { Button } from "./ui/button";
import { Item, ItemContent, ItemTitle } from "./ui/item";
import { authClient } from "../lib/auth-client";
import { cn } from "../lib/utils";
import { useTenant } from "../contexts/tenant-context";
import { formatFileName } from "../lib/format-filename";
import DocumentDropDownMenu from "./DocumentDropDown";
import { deleteFile } from "../storage/documents";
import { deleteUploadedFile } from "../app/actions/upload-file";
import { useState } from "react";
import { IDocumentType } from "../types/documents.types";

interface IDocumentItemProps {
	selectedDocument: IDocumentType | null;
	document: IDocumentType;
	handleSelectDoc: (document: IDocumentType) => void;
}
const DocumentItem = ({
	selectedDocument,
	document,
	handleSelectDoc,
}: IDocumentItemProps) => {
	const { data } = authClient.useSession();
	const [loading, setLoading] = useState(false);

	const deleteDocument = async () => {
		setLoading(true);
		// await deleteUploadedFile(document.id).finally(() => {
		// 	setLoading(false);
		// });
	};

	return (
		<Item
			variant={"outline"}
			className={cn("text-left flex justify-start w-full", {
				"border-green-500 border-2":
					selectedDocument && selectedDocument.id === document.id,
			})}
		>
			<ItemContent onClick={() => handleSelectDoc(document)}>
				<ItemTitle>{formatFileName(document.name, 30)}</ItemTitle>
			</ItemContent>
			{loading && <Loader className="animate-rotate animate-ping" />}

			<DocumentDropDownMenu
				deleteHandler={deleteDocument}
				document={document}
			/>
		</Item>
	);
};

const DocumentList = ({ files }: { files: IDocumentType[] }) => {
	const { selectedDocument, updateSelectedDocument } = useTenant();

	const handleSelectDoc = (doc: IDocumentType) => {
		const selected = files.find((item) => item.id === doc.id);
		if (selected) {
			updateSelectedDocument(selected);
		}
	};

	return (
		<ul className="flex flex-col gap-2 flex-1 overflow-y-auto w-full">
			{files.map((document) => (
				<DocumentItem
					document={document}
					handleSelectDoc={handleSelectDoc}
					key={document.id}
					selectedDocument={selectedDocument}
				/>
			))}
		</ul>
	);
};

export default DocumentList;
