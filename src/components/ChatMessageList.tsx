import { Bot } from "lucide-react";
import ChatMessage from "./ChatMessage";
import { ChatType } from "./Prompt";
import { useEffect, useRef } from "react";

interface ChatMessageListProps {
	chatList: ChatType[];
	isChatting?: boolean;
}

function ChatMessageList({ chatList, isChatting }: ChatMessageListProps) {
	const scrollRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		// scroll down when new item is added
		scrollRef.current?.scrollBy({ top: scrollRef.current?.scrollHeight! });
	}, [chatList]);
	return (
		<div
			ref={scrollRef}
			className="flex flex-col w-full flex-1 max-h-[70vh] pb-10 overflow-y-auto p-2 md:p-5 gap-2"
		>
			{/* Messsages are rendered here */}
			{chatList?.map((chat, index) => (
				<ChatMessage chat={chat} key={index} />
			))}
			{isChatting && <Bot className="animate-bounce text-orange-600" />}
		</div>
	);
}

export default ChatMessageList;
