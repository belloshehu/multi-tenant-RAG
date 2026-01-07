import { AzureOpenAIEmbeddings } from "@langchain/openai";

const embeddings = new AzureOpenAIEmbeddings({
	azureOpenAIApiEmbeddingsDeploymentName: "text-embedding-ada-002",
	apiKey: process.env.AZURE_OPENAI_API_KEY,
	azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME,
	azureOpenAIApiVersion: process.env.AZURE_OPENAI_API_VERSION,
});

export const Config = {
	embedder: embeddings,
};
