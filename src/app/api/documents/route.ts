import { supabase } from "@/src/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import * as storage from "@/src/storage/documents";
import * as database from "@/src/database/documents";
import { validateFile } from "@/src/lib/validate-file";

export async function GET() {
	try {
		const { data } = await supabase.from("document").select("*");
		return NextResponse.json(
			{
				data,
				message: "All documents",
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{
				error: "Failed to fetch all documents",
			},
			{
				status: 500,
			}
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData();
		const file = formData.get("file");
		const customFileName = formData.get("name") as string;
		const description = formData.get("description") as string;

		if (!file) {
			return NextResponse.json(
				{ error: "File is required", message: "File is required" },
				{
					status: 404,
				}
			);
		}

		if (!customFileName) {
			return NextResponse.json(
				{ error: "File name is required", message: "File name is required" },
				{
					status: 404,
				}
			);
		}
		// upload to supabase storage bucket
		// check if it ends with .pdf
		const isPdf = validateFile(customFileName as string, ".pdf");
		const formattedFileName = isPdf ? customFileName : customFileName + ".pdf";
		const result = await storage.uploadFile(file as File, formattedFileName);
		const publicUrl = storage.getPublicPdfUrl(result.path);

		// insert instance of document in the documents table
		const document = await database.insertDocument({
			documentDto: { fileUrl: publicUrl, name: customFileName, description },
		});
		return NextResponse.json(
			{
				data: { document },
				message: "Created document",
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{
				error: "Failed to create document:",
			},
			{
				status: 500,
			}
		);
	}
}
