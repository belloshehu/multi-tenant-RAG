import { UIMessage } from "ai";

export const extractPromptFromMessages = (messages: UIMessage[]) => {
	// last user message = prompt
	const lastMessage = (messages as UIMessage[]).at(-1);
	if (!lastMessage) throw new Error("Invalid messages");
	const prompt = lastMessage.parts
		.map((part) => (part.type === "text" ? part.text : ""))
		.join(" ");
	return prompt;
};
