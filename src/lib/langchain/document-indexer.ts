import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { supabase } from "../supabase";
import path from "path";
import fs from "fs";
import os from "os";
import { downloadFile } from "../../storage/documents";
import { LLMConfig } from "@/src/config/llm";

export const indexDocument = async (
	filePath: string,
	documentId: number,
	tenantId: number
) => {
	try {
		// download the file from  cloud storge(supabase)
		const { buffer, fileName } = await downloadFile(filePath);
		const tempPath = path.join(os.tmpdir(), fileName);
		fs.writeFileSync(tempPath, buffer);

		// STEP 1: Load document
		const loader = new PDFLoader(tempPath);
		const documents = await loader.load();

		// STEP 2: Split document
		const textSplitter = new RecursiveCharacterTextSplitter({
			chunkOverlap: 0,
			chunkSize: 200,
		});

		const splittedDocuments = await textSplitter.splitDocuments(documents);

		// STEP 3: Attach tenant id and document id to every chunk
		const documentsWithMetadata = splittedDocuments.map((doc) => ({
			...doc,
			metadata: {
				...doc.metadata,
				tenant_id: tenantId,
				document_id: documentId,
				source: filePath,
			},
		}));

		// STEP 4: Upload to supabase vector store
		await SupabaseVectorStore.fromDocuments(
			documentsWithMetadata,
			LLMConfig.embedder,
			{
				client: supabase,
				tableName: "documents",
				upsertBatchSize: 768,
			}
		);
	} catch (error) {
		console.log(error);
		throw error;
	}
};
