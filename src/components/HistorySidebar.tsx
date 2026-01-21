"use client";
import { Database, Link, ListMinus } from "lucide-react";
import { authClient } from "../lib/auth-client";
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

const HistorySidebar = () => {
	const { data } = authClient.useSession();
	const { data: documents, isLoading } = useGetAllDocuments();
	const chatHistory: string[] | null = null;

	return (
		<aside className="hidden md:col-span-1 h-screen w-full  pt-5 md:flex flex-col items-start justify-start gap-2 p-2 overflow-y-auto">
			<div className="flex p-2 border-[1px] w-full gap-1 rounded-md items-center">
				<h3 className="text-md">History</h3>
				<Badge variant={"secondary"} className="mr-auto ">
					{documents && documents.length ? documents?.length : 0}
				</Badge>
			</div>
			{chatHistory ? (
				<DocumentSelect documents={documents || []} />
			) : (
				<small>To use the chat history, you need to login</small>
			)}
		</aside>
	);
};

export default HistorySidebar;
