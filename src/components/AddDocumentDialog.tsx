import {
	Dialog,
	DialogTitle,
	DialogTrigger,
	DialogContent,
} from "@/src/components/ui/dialog";

import { Database, Menu, Plus } from "lucide-react";
import { Button } from "./ui/button";
import DocumentUploadForm from "./forms/DocumentUploadForm";

const AddDocumentDialog = ({ buttonText }: { buttonText?: string }) => {
	return (
		<Dialog>
			<DialogTrigger>
				<Button variant={"outline"}>
					<Plus className="text-green-400" />
					{buttonText && buttonText}
				</Button>
			</DialogTrigger>
			<DialogTitle hidden>add document</DialogTitle>

			<DialogContent className="w-full bg-white max-h-[70vh] overflow-y-auto">
				<h3 className="text-xl font-semibold md:font-bold">Add new document</h3>
				<DocumentUploadForm />
			</DialogContent>
		</Dialog>
	);
};

export default AddDocumentDialog;
