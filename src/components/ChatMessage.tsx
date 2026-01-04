import { ChatType } from "./Prompt";
import { cn } from "@/src/lib/utils";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
	chat: ChatType;
}
const ChatMessage = ({ chat }: ChatMessageProps) => {
	return (
		<p
			className={cn("p-2  shadow-sm text-wrap", {
				"justify-self-end rounded-tr-2xl rounded-bl-2xl self-end bg-white p-3":
					chat.mode === "user",
				"justify-self-start rounded-tl-2xl rounded-br-2xl bg-amber-50 self-start p-3":
					chat.mode === "system",
			})}
		>
			<ReactMarkdown>{chat.message}</ReactMarkdown>
		</p>
	);
};

export default ChatMessage;
