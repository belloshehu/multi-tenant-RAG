import { AzureOpenAIEmbeddings } from "@langchain/openai";
import axios from "axios";

const embeddings = new AzureOpenAIEmbeddings({
	azureOpenAIApiEmbeddingsDeploymentName: "text-embedding-ada-002",
	apiKey: process.env.AZURE_OPENAI_API_KEY,
	azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME,
	azureOpenAIApiVersion: process.env.AZURE_OPENAI_API_VERSION,
});

const resolveBaseUrl = () => {
	if (process.env.NODE_ENV === "production") {
		return process.env.API_BASE_URL_PROD;
	} else if (process.env.NODE_ENV === "development") {
		return process.env.API_BASE_URL_DEV;
	} else {
		return process.env.API_BASE_URL_TEST;
	}
};

const API_BASE_URL = resolveBaseUrl();

export const axiosInstance = axios.create({
	baseURL: API_BASE_URL,
});

export const Config = {
	embedder: embeddings,
	axiosInstance,
};
