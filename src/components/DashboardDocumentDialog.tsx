import { File, Info, Link, LoaderIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { IDocumentType } from "../types/documents.types";
import { Separator } from "./ui/separator";
import { useGetAllDocuments } from "../hooks/serivce-hooks/documents.service.hooks";
import DocumentList from "./DocumentList";
import DocumentTable from "./documents/DocumentTable";

interface IDocumentDetailDialogProps {}
const DashboardDocumentDialog = ({}: IDocumentDetailDialogProps) => {
	const { data: documents, isLoading } = useGetAllDocuments();
	return (
		<Dialog modal>
			<DialogTrigger className="flex items-center gap-2">
				<Button variant={"outline"}>
					<File className="" />
					Documents
				</Button>
			</DialogTrigger>
			<DialogTitle hidden>documents</DialogTitle>

			<DialogContent className="w-full bg-white max-h-[70vh] overflow-y-auto items-start justify-start">
				<DialogHeader>
					<h3 className="text-xl font-semibold md:text-2xl md:font-bold">
						Documents
					</h3>
				</DialogHeader>
				<Separator />
				<DialogDescription>Manage your documents</DialogDescription>
				{isLoading ? <LoaderIcon /> : <DocumentTable data={documents!} />}
			</DialogContent>
		</Dialog>
	);
};

export default DashboardDocumentDialog;
