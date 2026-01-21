import { Info, Link } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { IDocumentType } from "../types/documents.types";
import { Separator } from "./ui/separator";

interface IDocumentDetailDialogProps {
	document: IDocumentType;
}
const DocumentDetailDialog = ({ document }: IDocumentDetailDialogProps) => {
	return (
		<Dialog>
			<DialogTrigger className="flex items-center gap-2">
				<Info className="text-orange-600" /> Detail
			</DialogTrigger>
			<DialogTitle hidden>About techbot</DialogTitle>

			<DialogContent className="w-full bg-white max-h-[70vh] overflow-y-auto items-start justify-start">
				<DialogHeader>
					<h3 className="text-xl font-semibold md:text-2xl md:font-bold">
						{document?.name}
					</h3>
					<Button>
						<Link />
						Copy
					</Button>
				</DialogHeader>
				<Separator />
				{document.description && <p>{document.description}</p>}
			</DialogContent>
		</Dialog>
	);
};

export default DocumentDetailDialog;
