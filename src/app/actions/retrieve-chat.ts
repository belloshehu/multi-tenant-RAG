import { getBaseUrl } from "@/src/lib/getBaseUrl";

export const processChatAction = async (
	promptText: string,
	conversation_hist: string,
	document_id: number,
	tenant_id: number,
	tenant_support_email: string
): Promise<{ data: string; error: string }> => {
	const response = await fetch(`${getBaseUrl()}/api/documents/retrieve`, {
		method: "POST",
		body: JSON.stringify({
			prompt: promptText,
			conversation_hist,
			document_id,
			tenant_id,
			tenant_support_email,
		}),
	});

	const data = await response.json();
	return data;
};
