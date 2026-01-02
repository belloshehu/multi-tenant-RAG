"use client";
import { Send } from "lucide-react";

import { Button } from "./ui/button";
import { useState } from "react";
import { processChatAction } from "@/src/app/actions/retrieve-chat";
import ChatMessageList from "./ChatMessageList";
// import { formatConversationHistory } from "@/lib/formatConversationHistory";
import { Textarea } from "./ui/textarea";

// import { postPrompt, getAIResponse } from "@/actions/lmms";
export interface ChatType {
	message: string;
	mode: "user" | "system";
}

export default function Prompt() {
	const [prompt, setPrompt] = useState("");
	const [isChatting, setIsChatting] = useState(false);
	const [chatList, setChatList] = useState<ChatType[] | []>([]);

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
		<section className="col-span-5 flex flex-col gap-5 w-full flex-1 min-h-[80vh] overflow-y-auto rounded-4xl p-2 md:p-5">
			<ChatMessageList chatList={chatList} isChatting={isChatting} />
			<div className="rounded-full relative flex items-center w-full">
				<Textarea
					placeholder="Enter prompt message"
					onChange={(e) => setPrompt(e.target.value)}
					value={prompt}
					className="rounded-full border-[1px] border-green-400"
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
		</section>
	);
}
