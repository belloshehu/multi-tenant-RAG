import React from "react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";
import { IDocumentType } from "../types/documents.types";
import { Badge } from "./ui/badge";
import { formatDate } from "../lib/timedate";
import { Button } from "./ui/button";

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
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
};

export default DocumentTable;
