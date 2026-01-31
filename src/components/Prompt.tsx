"use client";
import { File, Send } from "lucide-react";
import { useEffect, useState } from "react";
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
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { toast } from "sonner";

// import { postPrompt, getAIResponse } from "@/actions/lmms";
export interface ChatType {
	message: string;
	mode: "user" | "system";
}

export default function Prompt() {
	const [prompt, setPrompt] = useState("");
	const [chatList, setChatList] = useState<ChatType[] | []>([]);
	const { selectedDocument, tenant } = useTenant();
	const [isFocused, setIsFocused] = useState(false);
	const { data: documents } = useGetAllDocuments();

	const { messages, sendMessage, status, error } = useChat({
		transport: new DefaultChatTransport({
			api: "/api/documents/retrieve",
			body: {
				document_id: selectedDocument?.id!,
				tenant_id: selectedDocument?.tenant_id!,
				tenant_support_email: tenant?.support_email!,
			},
		}),
	});

	useEffect(() => {
		setChatList([]);
	}, [tenant, selectedDocument]);

	const handleChat = async () => {
		if (!prompt.trim()) return;
		sendMessage({ text: prompt });
		setPrompt("");
	};

	// Handle error
	useEffect(() => {
		if (error) {
			toast.error("Error during chat: " + error?.message || "Unknown error");
		}
	}, [error]);

	return (
		<section
			className={cn(
				"relative col-span-4 flex flex-col gap-5 border-[0px] w-full h-[98%] justify-start overflow-y-auto  p-2 md:p-5 md:py-2"
			)}
		>
			{selectedDocument && (
				<ChatMessageList chatList={messages} status={status} />
			)}

			{selectedDocument ? (
				<div className="mb-12 rounded-full flex items-center w-full h-fit">
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
						className="rounded-full absolute right-5 md:right-8 p-2"
						onClick={handleChat}
						disabled={status === "submitted" || status === "streaming"}
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
