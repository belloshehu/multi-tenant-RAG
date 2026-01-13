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
import DeleteDocumentDialog from "./DeleteDocumentDialog";
import AddDocumentDialog from "./AddDocumentDialog";
import DocumentIndexingDialog from "./DocumentIndexingDialog";
import Link from "next/link";
import { LinkIcon } from "lucide-react";

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
					<TableHead>File</TableHead>
					<TableHead>Indexing</TableHead>
					<TableHead className="">Status</TableHead>
					<TableHead className="">Description</TableHead>
					<TableHead colSpan={2}>Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((document) => {
					return (
						<TableRow key={document.id}>
							<TableCell className="font-medium">{document.name}</TableCell>
							<TableCell>{formatDate(document.created_at!)}</TableCell>
							<TableCell>
								<Link href={document.fileUrl} target="_blank">
									<LinkIcon></LinkIcon>
								</Link>
							</TableCell>
							<TableCell className="">
								{document?.indexed ? (
									"Indexed"
								) : (
									<DocumentIndexingDialog
										documentId={document.id}
										fileName={document.name}
										tenantId={document.tenant_id}
										title="Indexing document."
									/>
								)}
							</TableCell>
							<TableCell className="">
								<Button>Enable</Button>
							</TableCell>
							<TableCell>
								<AboutDialog
									title={document.name}
									description={document.description!}
								/>
							</TableCell>
							<TableCell title="delete document">
								<DeleteDocumentDialog
									documentName={document.name}
									documentId={document.id}
									tenantId={document.tenant_id}
								/>
							</TableCell>
							<TableCell title="edit document">
								<AddDocumentDialog tenant_id={document.tenant_id} />
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
};

export default DocumentTable;
