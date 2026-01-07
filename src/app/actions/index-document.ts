import { getBaseUrl } from "@/src/lib/getBaseUrl";

export const uploadToSupabase = async (promptText: string) => {
	const response = await fetch(`${getBaseUrl()}/api/index-document`, {
		method: "POST",
		body: JSON.stringify({ prompt: promptText }),
	});
	const data = (await response.json()) as { message: string };
	return data;
};
