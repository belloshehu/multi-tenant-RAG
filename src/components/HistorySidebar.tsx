"use client";
import { Plus } from "lucide-react";
import { useGetAllDocuments } from "../hooks/serivce-hooks/documents.service.hooks";
import DocumentSelect from "./DocumentSelect";
import { Button } from "./ui/button";

const HistorySidebar = () => {
	const { data: documents } = useGetAllDocuments();
	const chatHistory: string[] | null = null;

	return (
		<aside className="border-[1px] hidden md:col-span-2 h-screen w-full  pt-5 md:flex flex-col items-start justify-start gap-2 p-2 overflow-y-auto">
			<div className="flex p-2 border-[1px] w-full gap-1 rounded-md items-center justify-between">
				<h3 className="text-md">History</h3>
				<Button disabled size="sm" variant="ghost">
					<Plus /> New Chat
				</Button>
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
