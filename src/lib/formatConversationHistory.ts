import { ChatType } from "@/src/components/Prompt";
import { UIMessage } from "ai";

export const formatConversationHistoryLang = (chats: ChatType[]) => {
	return chats.map(({ message, mode }) => `${mode}: ${message}`).join("\n");
};

export const formatConversationHistoryVercel = (messages: UIMessage[]) => {
	const conversation_hist = messages
		.slice(0, -1)
		.map(
			(m: UIMessage) =>
				`${m.role}: ${m.parts
					.map((part) => (part.type === "text" ? part.text : ""))
					.join("")}`
		)
		.join("\n");
	return conversation_hist;
};
