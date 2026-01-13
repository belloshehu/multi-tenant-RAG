"use client";

import { Scissors } from "lucide-react";
import {
	Dialog,
	DialogOverlay,
	DialogTrigger,
} from "@/src/components/ui/dialog";
import Loader from "../Loader";
import { useIndexDocument } from "@/src/hooks/serivce-hooks/documents.service.hooks";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface IDocumentIndexingDialogProps {
	title: string;
	description?: string;
	triggerText?: string;
	fileName: string;
	documentId: number;
	tenantId: number;
}

const DocumentIndexingDialog = ({
	title,
	triggerText,
	fileName,
	documentId,
	tenantId,
}: IDocumentIndexingDialogProps) => {
	const { mutateAsync, isPending, isSuccess, error } =
		useIndexDocument(tenantId);
	const handleIndexing = async () => {
		mutateAsync({
			payload: { fileName, document_id: documentId, tenant_id: tenantId },
		});
	};

	return (
		<Dialog>
			<DialogTrigger title={title} onClick={handleIndexing}>
				<Scissors className="" /> {triggerText && triggerText}
			</DialogTrigger>
			{isPending && (
				<DialogOverlay className="flex justify-center items-center bg-black/80 flex-col gap-5">
					<DotLottieReact
						autoplay
						loop
						src="/animations/File-copying.lottie"
						className="w-full md:w-1/2"
					/>
					<Loader message="Indexing...." />
				</DialogOverlay>
			)}
		</Dialog>
	);
};

export default DocumentIndexingDialog;
