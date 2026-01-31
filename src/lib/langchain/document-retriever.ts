import { PromptTemplate } from "@langchain/core/prompts";
import {
	RunnablePassthrough,
	RunnableSequence,
} from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { combineDocuments } from "../rag";
import { LLMConfig } from "@/src/config/llm";
import { getVectorStore } from "../vectorStore";
import {
	ChatPromptTemplate,
	MessagesPlaceholder,
} from "@langchain/core/prompts";
import { BaseMessage } from "@langchain/core/messages";

// /*
//  *	Function to retrieve information from the vector database for argumentation to answer query.
//  *
//  */

export const retrieveInformation = async (
	prompt: string,
	chatHistory: BaseMessage[],
	tenantId: number,
	documentId: number,
	tenant_support_email: string
) => {
	const vectorStore = await getVectorStore();

	const retriever = vectorStore.asRetriever({
		k: 2,
		filter: { tenant_id: tenantId, document_id: documentId },
	});

	// Step 2: Prepare answer prompt
	const answerTemplate = ChatPromptTemplate.fromMessages([
		[
			"system",
			`You are a helpful and enthusiastic support bot who can answer a given question on the context provided.
			Try to find the answer in the context. If the answer is not in the context, try to find it in the conversation history if possible. If you really don't know the answer, say "I'm sorry, I don't know the answer to that."
			Don't try to make up an answer. Always speak as if you were chatting to a friend.
			context: {context}
		
	`,
		],
		new MessagesPlaceholder("conversation_hist"),
		["human", "{question}"],
	]);

	// const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);

	// Step 3: Prepare standalone question prompt template
	const standAloneQuestionTemplate =
		"Given a question and conversation history(if any), convert it to a standalone question. question: {question} standalone question";
	const standAloneQuestionPrompt = PromptTemplate.fromTemplate(
		standAloneQuestionTemplate
	);

	// Step 4: prepare chains
	const llm = LLMConfig.chatllm;
	const answerChain = RunnableSequence.from([
		answerTemplate,
		llm,
		//new StringOutputParser(),
	]);

	const standAloneQuestionChain = RunnableSequence.from([
		standAloneQuestionPrompt,
		llm,
		new StringOutputParser(),
	]);

	const retrieverChain = RunnableSequence.from([
		(prevResult) => prevResult.standalone_question,
		retriever,
		combineDocuments,
	]);

	const chain = RunnableSequence.from([
		{
			standalone_question: standAloneQuestionChain,
			original_input: new RunnablePassthrough(),
		},
		{
			context: retrieverChain,
			question: ({ original_input }) => original_input.question,
			conversation_hist: ({ original_input }) =>
				original_input.conversation_hist,
		},
		answerChain,
	]);

	const stream = await chain.stream({
		question: prompt,
		conversation_hist: chatHistory,
	});

	return stream;
};
