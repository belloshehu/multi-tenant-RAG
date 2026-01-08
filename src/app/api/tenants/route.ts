import { ITenantPayloadType } from "@/src/types/tenants.types";
import { NextRequest, NextResponse } from "next/server";
import StatusCodes from "http-status-codes";
import * as tenantData from "@/src/database/tenants";
import * as userData from "@/src/database/users";
import { authClient } from "@/src/lib/auth-client";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { name, description, email, support_email, logo, site_url, user_id } =
			body as ITenantPayloadType;

		if (!user_id) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: StatusCodes.UNAUTHORIZED }
			);
		}
		if (!name) {
			return NextResponse.json(
				{ error: "Tenant name is required" },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}

		if (!email) {
			return NextResponse.json(
				{ error: "Tenant name is required" },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}

		if (!support_email) {
			return NextResponse.json(
				{ error: "Tenant support email is required" },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}

		if (!description) {
			return NextResponse.json(
				{ error: "Tenant description is required" },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}

		if (!logo) {
			return NextResponse.json(
				{ error: "Tenant logo url is required" },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}

		if (!site_url) {
			return NextResponse.json(
				{ error: "Tenant website url is required" },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}

		const user = await userData.getUserById(user_id);
		if (!user) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: StatusCodes.UNAUTHORIZED }
			);
		}

		const tenant = await tenantData.insertTenant({
			tenantDto: { ...body, user_id: user.id },
		});

		return NextResponse.json(
			{ data: tenant, message: "Tenant registerd " },
			{ status: StatusCodes.CREATED }
		);
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to register tenant." },
			{ status: StatusCodes.INTERNAL_SERVER_ERROR }
		);
	}
}

export async function GET() {
	const tenants = await tenantData.getAllTenants();
	return NextResponse.json(
		{ data: tenants, message: "Tenants" },
		{ status: StatusCodes.OK }
	);
}
