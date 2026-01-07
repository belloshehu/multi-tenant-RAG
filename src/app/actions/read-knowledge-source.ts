import { getBaseUrl } from "@/src/lib/getBaseUrl";

export const fetchKnowledgeSource = async (): Promise<{ data: string }> => {
	const response = await fetch(`${getBaseUrl()}/api/source`);
	const data = await response.json();
	return data;
};
