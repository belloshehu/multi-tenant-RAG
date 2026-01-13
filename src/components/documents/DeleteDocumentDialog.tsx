"use client";

import { Trash } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogOverlay,
	DialogTrigger,
} from "@/src/components/ui/dialog";
import { useDeleteDocument } from "@/src/hooks/serivce-hooks/documents.service.hooks";
import Loader from "../Loader";
import useToggle from "@/src/hooks/use-toggle";

interface IDeleteDocumentDialogProps {
	documentName: string;
	triggerText?: string;
	documentId: number;
	tenantId: number;
}
const DeleteDocumentDialog = ({
	documentName,
	triggerText,
	documentId,
	tenantId,
}: IDeleteDocumentDialogProps) => {
	const { isPending, mutateAsync } = useDeleteDocument(documentId, tenantId);
	const { isToggled, toggle } = useToggle();

	const handleDelete = () => {
		mutateAsync({ id: documentId }).then(() => {
			toggle();
		});
	};

	return (
		<Dialog open={isToggled} onOpenChange={toggle}>
			<DialogTrigger title={documentName}>
				<Button variant={"outline"}>
					<Trash className="text-red-500" /> {triggerText && triggerText}
				</Button>
			</DialogTrigger>

			{isPending ? (
				<DialogOverlay>
					<Loader message="Deleting...." />
				</DialogOverlay>
			) : (
				<DialogContent className="w-full bg-white max-h-[70vh] overflow-y-auto items-start justify-start">
					<h3 className="text-xl font-semibold md:text-2xl md:font-bold">
						{"Delete Document?"}
					</h3>
					<p>
						{`You are DeleteDocument to delete the following document from this tenant: `}
					</p>
					<q>{documentName}</q>
					<DialogFooter className="w-full">
						<Button variant={"destructive"} onClick={handleDelete}>
							Yes delete
						</Button>
						<Button>Cancel</Button>
					</DialogFooter>
				</DialogContent>
			)}
		</Dialog>
	);
};

export default DeleteDocumentDialog;
