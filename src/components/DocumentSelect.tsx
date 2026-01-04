import React from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { IDocumentType } from "../types/documents.types";
import { useTenant } from "../contexts/tenant-context";

interface IDocumentSelectProps {
	documents: IDocumentType[];
}
const DocumentSelect = ({ documents }: IDocumentSelectProps) => {
	const { updateSelectedDocument } = useTenant();
	return (
		<Select
			onValueChange={(id) => {
				const selected = documents.find(
					(doc) => doc.id.toString() === id.toString()
				);
				if (selected) {
					updateSelectedDocument(selected);
				}
			}}
		>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Select a document" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Documents</SelectLabel>
					{documents.map((document) => (
						<SelectItem key={document.id} value={document.id.toString()}>
							{document.name}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

export default DocumentSelect;
