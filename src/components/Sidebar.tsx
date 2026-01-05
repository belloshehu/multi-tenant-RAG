"use client";
import { Database, Link, ListMinus } from "lucide-react";
import { authClient } from "../lib/auth-client";
import AddDocumentDialog from "./AddDocumentDialog";
import { Badge } from "./ui/badge";
import { useGetAllDocuments } from "../hooks/serivce-hooks/documents.service.hooks";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemHeader,
	ItemMedia,
	ItemTitle,
} from "./ui/item";
import DocumentSelect from "./DocumentSelect";
import { useTenant } from "../contexts/tenant-context";
import { Separator } from "./ui/separator";

const Sidebar = () => {
	const { data } = authClient.useSession();
	const { data: documents, isLoading } = useGetAllDocuments();
	const { selectedDocument } = useTenant();

	return (
		<aside className="hidden md:col-span-2 border-r-[1px] h-screen w-full pt-5 md:flex flex-col items-start justify-start gap-2 p-2">
			{data && data.user && (
				<h3>
					Hello {data.user.name}!
					{(data.user as any).role && (data.user as any).role}
				</h3>
			)}
			<div className="flex p-2 border-[1px] w-full gap-1  items-center">
				<Database size={20} />
				<h3 className="text-xl">Documents</h3>
				<Badge variant={"secondary"} className="mr-auto ">
					{documents && documents.length ? documents?.length : 0}
				</Badge>
				{data && data.user && <AddDocumentDialog />}
			</div>
			{documents ? (
				<DocumentSelect documents={documents || []} />
			) : (
				<Item variant={"outline"} className="w-full">
					<ItemContent>
						<ItemTitle>
							<ItemMedia>
								<ListMinus />
							</ItemMedia>
							No documents
						</ItemTitle>
						<ItemDescription>
							No document to interact with. You can try again later after
							documents are added.
						</ItemDescription>
					</ItemContent>
				</Item>
			)}
			{selectedDocument && (
				<Item variant={"outline"}>
					<ItemHeader className="p-0">
						<ItemTitle>{selectedDocument?.name}</ItemTitle>
						<ItemMedia>
							<ItemActions>
								<Link className="text-green-400" size={16} />
							</ItemActions>
						</ItemMedia>
					</ItemHeader>

					<Separator className="p-0" />
					<ItemContent>
						<p>{selectedDocument?.description}</p>
					</ItemContent>
				</Item>
			)}
		</aside>
	);
};

export default Sidebar;
