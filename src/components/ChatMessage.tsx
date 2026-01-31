import { cn } from "@/src/lib/utils";
import { UIDataTypes, UIMessage, UITools } from "ai";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
	chat: UIMessage<unknown, UIDataTypes, UITools>;
}
const ChatMessage = ({ chat }: ChatMessageProps) => {
	return (
		<p
			className={cn(
				"p-2  shadow-sm text-wrap whitespace-pre-wrap wrap-break-word w-max-full text-sm",
				{
					"justify-self-end rounded-tr-2xl rounded-bl-2xl self-end bg-gray-100 p-3":
						chat.role === "user",
					"justify-self-start rounded-tl-2xl rounded-br-2xl self-start p-3":
						chat.role === "assistant",
				}
			)}
		>
			{chat.parts.map((part, index) =>
				part.type === "text" ? (
					<ReactMarkdown key={index}>{part.text}</ReactMarkdown>
				) : null
			)}
		</p>
	);
};

export default ChatMessage;
