import { Bot, LoaderIcon } from "lucide-react";
import ChatMessage from "./ChatMessage";
import { useEffect, useRef } from "react";
import { ChatStatus, UIDataTypes, UIMessage, UITools } from "ai";

interface ChatMessageListProps {
	chatList: UIMessage<unknown, UIDataTypes, UITools>[];
	status?: ChatStatus;
}

function ChatMessageList({ chatList, status }: ChatMessageListProps) {
	const scrollRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		// scroll down when new item is added
		scrollRef.current?.scrollBy({ top: scrollRef.current?.scrollHeight! });
	}, [chatList]);

	const renderStatus = () => {
		if (status === "submitted") {
			return (
				<div className="flex items-center gap-2 text-sm text-gray-500">
					<LoaderIcon className="animate-spin" />
					<span>AI is typing...</span>
				</div>
			);
		} else if (status === "error") {
			return (
				<div className="flex items-center gap-2 text-sm text-red-500">
					<Bot />
					<span>Error occurred. Please try again.</span>
				</div>
			);
		}
		return null;
	};
	return (
		<div
			ref={scrollRef}
			className="flex flex-col w-full flex-8 pr-5 pb-52 overflow-y-auto  gap-2 overflow-x-hidden h-full "
		>
			{/* Messsages are rendered here */}
			{chatList?.map((chat, index) => (
				<ChatMessage chat={chat} key={index} />
			))}
			{renderStatus()}
		</div>
	);
}

export default ChatMessageList;
