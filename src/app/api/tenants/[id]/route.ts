import { getTenantById } from "@/src/database/tenants";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;
		if (!id) {
			return NextResponse.json(
				{ error: "Tenant id is required" },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}
		const tenant = await getTenantById(id);
		return NextResponse.json(
			{ data: tenant, message: "Tenant by id" },
			{ status: StatusCodes.OK }
		);
	} catch (error: any) {
		return NextResponse.json(
			{ error: "Indexing failed:" + error?.message || "Unknown error" },
			{ status: StatusCodes.INTERNAL_SERVER_ERROR }
		);
	}
}
