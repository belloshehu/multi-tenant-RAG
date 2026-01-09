"use client";
import { File, Send } from "lucide-react";
import { useState } from "react";
import { processChatAction } from "@/src/app/actions/retrieve-chat";
import ChatMessageList from "./ChatMessageList";
// import { formatConversationHistory } from "@/lib/formatConversationHistory";
import { Textarea } from "./ui/textarea";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
} from "@/src/components/ui/item";
import { useTenant } from "../contexts/tenant-context";
import { cn } from "../lib/utils";
import { useGetAllDocuments } from "../hooks/serivce-hooks/documents.service.hooks";
import { Button } from "./ui/button";

// import { postPrompt, getAIResponse } from "@/actions/lmms";
export interface ChatType {
	message: string;
	mode: "user" | "system";
}

export default function Prompt() {
	const [prompt, setPrompt] = useState("");
	const [isChatting, setIsChatting] = useState(false);
	const [chatList, setChatList] = useState<ChatType[] | []>([]);
	const { selectedDocument } = useTenant();
	const [isFocused, setIsFocused] = useState(false);
	const { data: documents } = useGetAllDocuments();

	const handleChat = async () => {
		setIsChatting(true);
		if (prompt) {
			setChatList((prev) => [...prev, { message: prompt, mode: "user" }]);
		}
		try {
			const response = await processChatAction(
				prompt,
				""
				// formatConversationHistory(chatList)
			);
			if (response) {
				setChatList((prev) => [
					...prev,
					{ message: response.data || response.error, mode: "system" },
				]);
			}
		} catch (error) {
			console.error("Something went wrong", error);
		} finally {
			setIsChatting(false);
			setPrompt("");
		}
	};

	return (
		<section
			className={cn(
				"col-span-5 flex flex-col gap-5 border-[1px] w-full h-[98%] justify-start overflow-y-auto rounded-4xl p-2 md:p-5 md:py-2"
			)}
		>
			{selectedDocument && (
				<ChatMessageList chatList={chatList} isChatting={isChatting} />
			)}

			{selectedDocument ? (
				<div className="rounded-full relative flex-3 flex items-center w-full">
					<Textarea
						placeholder={`Enter prompt message ${
							selectedDocument ? "about " + selectedDocument.name : ""
						}`}
						onChange={(e) => setPrompt(e.target.value)}
						value={prompt}
						className="rounded-full border-[1px]"
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
					/>
					<Button
						// onClick={handleClick}
						className="rounded-full absolute right-2"
						onClick={handleChat}
						disabled={isChatting}
					>
						<Send className="text-green-600" />
					</Button>
				</div>
			) : documents?.length ? (
				<Item variant={"outline"}>
					<ItemContent>
						<ItemTitle>
							<ItemMedia>
								<File size={20} />
							</ItemMedia>
							Select a document
						</ItemTitle>
						<ItemDescription>
							Select the document you want to ask question about
						</ItemDescription>
					</ItemContent>
				</Item>
			) : null}
		</section>
	);
}
