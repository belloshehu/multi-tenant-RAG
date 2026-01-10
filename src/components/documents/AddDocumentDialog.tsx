"use client";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
} from "@/src/components/ui/dialog";

import { File } from "lucide-react";
import { Button } from "../ui/button";
import DocumentUploadForm from "../forms/DocumentUploadForm";

const AddDocumentDialog = ({ buttonText }: { buttonText?: string }) => {
	return (
		<Dialog>
			<DialogTrigger title="Add document">
				<Button variant={"outline"} className="rounded-full p-0 w-8 h-8">
					<File className="text-green-400" />
					{buttonText && buttonText}
				</Button>
			</DialogTrigger>

			<DialogContent className="w-full bg-white max-h-[70vh] overflow-y-auto">
				<h3 className="text-xl font-semibold md:font-bold">Add new document</h3>
				<DocumentUploadForm />
			</DialogContent>
		</Dialog>
	);
};

export default AddDocumentDialog;
