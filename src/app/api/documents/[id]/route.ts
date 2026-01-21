import { deleteDocument, unIndexDocument } from "@/src/database/documents";
import { deleteFile } from "@/src/storage/documents";
import { StatusCodes } from "http-status-codes";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		// const id = request.nextUrl.searchParams.get("id") as string;
		const { id } = await params;
		if (!id) {
			return NextResponse.json(
				{ error: "Document id is required" },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}
		// Delete instance of the document from document table
		const document = await deleteDocument(parseInt(id));
		if (!document) {
			return NextResponse.json(
				{ error: "Invalid document" },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}
		// Remove the index/embeddings from the vector db
		await unIndexDocument(document.tenant_id, document.id);

		// Remove from storage
		await deleteFile(document.name);

		revalidatePath("/dashboard/tenants/" + document?.tenant_id, "page");
		return NextResponse.json(
			{ error: "Document deleted successfully" },
			{ status: StatusCodes.OK }
		);
	} catch (error) {
		throw error;
	}
}
