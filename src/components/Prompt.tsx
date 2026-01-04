"use client";
import { File, Send } from "lucide-react";

import { Button } from "./ui/button";
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
import { formatFileName } from "../lib/format-filename";
import { cn } from "../lib/utils";

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
				"col-span-5 flex flex-col gap-0 w-full h-full overflow-y-auto rounded-4xl p-2 md:p-5 md:py-2"
			)}
		>
			{selectedDocument && (
				<div className="flex items-center justify-between text-xl font-semibold w-full border-[1px] p-2 rounded-md">
					<h3 className="text-sm font-normal">Selected document</h3>
					<Item variant={"outline"} className="p-1 px-2">
						<ItemContent>
							<ItemTitle>
								<ItemMedia>
									<File size={16} className="text-gray-500" />
								</ItemMedia>
								{formatFileName(selectedDocument.name, 40)}
							</ItemTitle>
						</ItemContent>
					</Item>
				</div>
			)}
			<ChatMessageList chatList={chatList} isChatting={isChatting} />

			{selectedDocument ? (
				<div className="rounded-full relative flex items-center w-full">
					<Textarea
						placeholder={`Enter prompt message ${
							selectedDocument ? "about " + selectedDocument.name : ""
						}`}
						onChange={(e) => setPrompt(e.target.value)}
						value={prompt}
						className="rounded-full border-[1px]"
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
			) : (
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
			)}
		</section>
	);
}
