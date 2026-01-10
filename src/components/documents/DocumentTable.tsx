import React from "react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { IDocumentType } from "../../types/documents.types";
import { Badge } from "../ui/badge";
import { formatDate } from "../../lib/timedate";
import { Button } from "../ui/button";
import AboutDialog from "../AboutDialog";
import { Edit, Trash } from "lucide-react";
import DeleteDocumentDialog from "./DeleteDocumentDialog";
import AddDocumentDialog from "./AddDocumentDialog";

interface IDocumentTableProps {
	data: IDocumentType[];
}
const DocumentTable = ({ data }: IDocumentTableProps) => {
	if (!data || data.length === 0) return <Badge>No daocuments</Badge>;
	return (
		<Table>
			<TableCaption>A list of your uploaded documents.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">Name</TableHead>
					<TableHead>Created At</TableHead>
					<TableHead>Indexing</TableHead>
					<TableHead className="text-right">Status</TableHead>
					<TableHead className="text-right">Description</TableHead>
					<TableHead colSpan={2}>Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((document) => {
					return (
						<TableRow>
							<TableCell className="font-medium">{document.name}</TableCell>
							<TableCell>{formatDate(document.created_at!)}</TableCell>
							<TableCell className="text-right">
								<Button variant={"outline"}>Index</Button>
							</TableCell>
							<TableCell className="text-right">
								<Button>Enable</Button>
							</TableCell>
							<TableCell>
								<AboutDialog
									title={document.name}
									description={document.description!}
								/>
							</TableCell>
							<TableCell title="delete document">
								<DeleteDocumentDialog documentName={document.name} />
							</TableCell>
							<TableCell title="edit document">
								<AddDocumentDialog />
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
};

export default DocumentTable;
