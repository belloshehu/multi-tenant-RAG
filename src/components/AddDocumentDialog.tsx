import {
	Dialog,
	DialogTitle,
	DialogTrigger,
	DialogContent,
} from "@/src/components/ui/dialog";

import { Database, Menu, Plus } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "./ui/button";

const AddDocumentDialog = ({ children }: { children: ReactNode }) => {
	return (
		<Dialog>
			<DialogTrigger>
				<Button variant={"outline"}>
					<Plus className="text-orange-600" /> Add Document
				</Button>
			</DialogTrigger>
			<DialogTitle hidden>add document</DialogTitle>

			<DialogContent className="w-full bg-white max-h-[70vh] overflow-y-auto">
				<h3 className="text-xl font-semibold md:font-bold">Add new document</h3>
				{children}
			</DialogContent>
		</Dialog>
	);
};

export default AddDocumentDialog;
