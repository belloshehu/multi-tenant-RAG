import { fetchDocument, updateDocument } from "@/src/database/documents";
import { indexDocument } from "@/src/lib/langchain";
import { IDocumentIndexingPayload } from "@/src/types/documents.types";
import { StatusCodes } from "http-status-codes";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as IDocumentIndexingPayload;
		const { fileName, document_id, tenant_id } = body;

		if (!fileName) {
			return NextResponse.json(
				{ error: "File path/url is required" },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}

		if (!tenant_id) {
			return NextResponse.json(
				{ error: "Tenant id is required" },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}

		if (!document_id) {
			return NextResponse.json(
				{ error: "Document id is required" },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}

		// fetch the document
		const document = await fetchDocument(document_id);
		if (!document) {
			return NextResponse.json(
				{ error: "Document not found" },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}

		await indexDocument(fileName, document_id, tenant_id);
		// update the document
		await updateDocument({
			documentDto: { ...document, indexed: true },
			id: document_id,
		});

		revalidatePath("/dashboard/tenants/" + tenant_id, "page");
		return NextResponse.json(
			{ message: "Document indexed successfully", success: true },
			{ status: StatusCodes.OK }
		);
	} catch (error: any) {
		return NextResponse.json(
			{ error: "Indexing failed:" + error?.message || "Unknown error" },
			{ status: StatusCodes.INTERNAL_SERVER_ERROR }
		);
	}
}
