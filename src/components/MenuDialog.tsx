import { Menu } from "lucide-react";
import KnowledgeSourceModal from "./AddDocumentDialog";
import AboutDialog from "@/src/components/AboutDialog";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/src/components/ui/dialog";
import AddDocumentDialog from "./AddDocumentDialog";

const MenuDialog = ({
	knowledgeSourceText,
}: {
	knowledgeSourceText: string;
}) => {
	return (
		<Dialog>
			<DialogTrigger>
				<Menu className="text-white" />
			</DialogTrigger>
			<DialogTitle hidden>Menu dialog</DialogTitle>

			<DialogContent className="w-full bg-white max-h-[70vh] overflow-y-auto flex flex-col items-start justify-start">
				<AboutDialog />
				<AddDocumentDialog>
					{knowledgeSourceText.split("\n\n").map((paragraph, i) => (
						<p key={i}>{paragraph}</p>
					))}
				</AddDocumentDialog>
			</DialogContent>
		</Dialog>
	);
};

export default MenuDialog;
