import { NextRequest } from "next/server";
import { retrieveInformation } from "@/src/lib/langchain/document-retriever";
import { createUIMessageStreamResponse } from "ai";
import { toBaseMessages, toUIMessageStream } from "@ai-sdk/langchain";
import { extractPromptFromMessages } from "@/src/lib/extractPromptFromMessages";

export async function POST(req: NextRequest) {
	const { document_id, tenant_id, tenant_support_email, messages } =
		await req.json();

	if (!messages || !document_id || !tenant_id) {
		return new Response("Missing required parameters", { status: 400 });
	}

	const prompt = extractPromptFromMessages(messages);

	const chatHistory = await toBaseMessages(messages);

	// Convert the LangChain stream to UI message stream
	const langchainStream = await retrieveInformation(
		prompt,
		chatHistory,
		tenant_id,
		document_id,
		tenant_support_email
	);

	return createUIMessageStreamResponse({
		stream: toUIMessageStream(langchainStream),
	});
}
