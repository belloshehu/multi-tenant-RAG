import { IDocumentType } from "../types/documents.types";
import DocumentDetailDialog from "./DocumentDetailDialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Info, MoreVertical, Trash } from "lucide-react";

interface IDocumentDropDownMenu {
	deleteHandler: () => {};
	document: IDocumentType;
}

const DocumentDropDownMenu = ({
	deleteHandler,
	document,
}: IDocumentDropDownMenu) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<MoreVertical className="text-gray-500" size={20} />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onClick={deleteHandler}>
					<Trash />
					Delete
				</DropdownMenuItem>
				<DropdownMenuItem>
					<DocumentDetailDialog document={document} />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default DocumentDropDownMenu;
