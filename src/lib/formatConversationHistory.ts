import { ChatType } from "@/app/components/Prompt";

export const formatConversationHistory = (chats: ChatType[]) => {
	return chats.map(({ message, mode }) => `${mode}: ${message}`).join("\n");
};
