import { getBaseUrl } from "@/src/lib/getBaseUrl";

export const processChatAction = async (
	promptText: string,
	conversation_hist: string
): Promise<{ data: string; error: string }> => {
	const response = await fetch(`${getBaseUrl()}/api/retrieve`, {
		method: "POST",
		body: JSON.stringify({ prompt: promptText, conversation_hist }),
	});

	const data = await response.json();
	return data;
};
