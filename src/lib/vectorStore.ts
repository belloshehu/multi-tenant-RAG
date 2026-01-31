import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { supabase } from "@/src/lib/supabase";
import { LLMConfig } from "@/src/config/llm";

let vectorStorePromise: Promise<SupabaseVectorStore> | null = null;

export function getVectorStore() {
	if (!vectorStorePromise) {
		vectorStorePromise = SupabaseVectorStore.fromExistingIndex(
			LLMConfig.embedder,
			{
				client: supabase,
				queryName: "match_documents",
				tableName: "documents",
			}
		);
	}
	return vectorStorePromise;
}
