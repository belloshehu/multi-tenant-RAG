import { Info, Trash } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
} from "@/src/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";

interface IDeleteDocumentDialogProps {
	documentName: string;
	triggerText?: string;
}
const DeleteDocumentDialog = ({
	documentName,
	triggerText,
}: IDeleteDocumentDialogProps) => {
	return (
		<Dialog>
			<DialogTrigger title={documentName}>
				<Button variant={"outline"}>
					<Trash className="text-red-400" /> {triggerText && triggerText}
				</Button>
			</DialogTrigger>

			<DialogContent className="w-full bg-white max-h-[70vh] overflow-y-auto items-start justify-start">
				<h3 className="text-xl font-semibold md:text-2xl md:font-bold">
					{"Delete Document?"}
				</h3>
				<p>
					{`You are DeleteDocument to delete the following document from this tenant: `}
				</p>
				<q>{documentName}</q>
				<DialogFooter className="w-full">
					<Button variant={"destructive"}>Yes delete</Button>
					<Button>Cancel</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteDocumentDialog;
