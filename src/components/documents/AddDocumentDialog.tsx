"use client";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
} from "@/src/components/ui/dialog";

import { File, Pencil } from "lucide-react";
import DocumentUploadForm from "../forms/DocumentUploadForm";
import { useState } from "react";
import { Button } from "../ui/button";

const AddDocumentDialog = ({
	buttonText,
	tenant_id,
	mode = "create",
}: {
	buttonText?: string;
	tenant_id: number;
	mode?: "create" | "edit";
}) => {
	const [visible, setVisible] = useState(false);

	return (
		<Dialog open={visible} onOpenChange={() => setVisible((prev) => !prev)}>
			<DialogTrigger title="Add document">
				<Button variant={"outline"}>
					{mode === "create" ? (
						<File className="text-primary" size={20} />
					) : (
						<Pencil className="text-primary" size={20} />
					)}
					{buttonText && buttonText}
				</Button>
			</DialogTrigger>

			<DialogContent className="w-full bg-white max-h-[70vh] overflow-y-auto">
				<h3 className="text-xl font-semibold md:font-bold">Add new document</h3>
				<DocumentUploadForm
					onClose={() => setVisible(false)}
					tenant_id={tenant_id}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default AddDocumentDialog;
