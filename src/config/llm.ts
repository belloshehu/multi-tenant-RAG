import { AzureOpenAIEmbeddings, AzureChatOpenAI } from "@langchain/openai";
import { ChatOllama, OllamaEmbeddings } from "@langchain/ollama";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import {
	ChatGoogleGenerativeAI,
	GoogleGenerativeAIEmbeddings,
} from "@langchain/google-genai";

// AZURE OPENAI CONFIGURATION
const embeddings = new AzureOpenAIEmbeddings({
	azureOpenAIApiEmbeddingsDeploymentName: "text-embedding-ada-002",
	apiKey: process.env.AZURE_OPENAI_API_KEY,
	azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME,
	azureOpenAIApiVersion: process.env.AZURE_OPENAI_API_VERSION,
});

const azureChhatllm = new AzureChatOpenAI({
	deploymentName: process.env.AZURE_OPENAI_API_INSTANCE_NAME,
	apiKey: process.env.AZURE_OPENAI_API_KEY_CHAT,
	azureOpenAIEndpoint: process.env.AZURE_OPENAI_API_ENDPOINT,
	model: process.env.AZURE_OPENAI_API_MODEL_CHAT,
	openAIApiVersion: process.env.AZURE_OPENAI_API_VERSION_CHAT,
});

// GOOGLE GENERATIVE AI CONFIGURATION
const googleApiKey = process.env.GOOGLE_API_KEY || "";
const googleEmdeddings = new GoogleGenerativeAIEmbeddings({
	apiKey: googleApiKey,
	model: "gemini-embedding-001",
});

const googlellm = new ChatGoogleGenerativeAI({
	apiKey: googleApiKey,
	model: "gemini-flash-latest",
	temperature: 0,
});

// OLLAMA CONFIGURATION
const ollamaEmbeddingllm = new OllamaEmbeddings({
	model: "nomic-embed-text:latest",
});
const ollamaChatllm = new ChatOllama({
	model: "llama3.2:latest", // Default value.
	streaming: true,
});

// OPENAI CONFIGURATION
const openaiEmbeddings = new OpenAIEmbeddings({
	model: "text-embedding-ada-002",
	openAIApiKey: process.env.OPEN_ROUTER_API_KEY,
});

const openaiChatllm = new ChatOpenAI({
	model: "openai/gpt-5.2",
	temperature: 0,
	streaming: true,
	apiKey: process.env.OPEN_ROUTER_API_KEY,
});

export const LLMConfig = {
	embedder: ollamaEmbeddingllm,
	azureChhatllm,
	chatllm: ollamaChatllm,
};
