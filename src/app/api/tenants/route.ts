import { NextRequest, NextResponse } from "next/server";
import StatusCodes from "http-status-codes";
import * as tenantData from "@/src/database/tenants";
import * as userData from "@/src/database/users";
import * as storage from "@/src/storage/logos";
import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData();
		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const description = formData.get("description") as string;
		const site_url = formData.get("site_url") as string;
		const logo = formData.get("logo") as File;
		const support_email = formData.get("support_email") as string;
		const user_id = formData.get("user_id") as string;

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
				{ error: "Tenant logo file is required" },
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

		const existingTenant = await tenantData.getTenantByName(name);
		if (existingTenant && existingTenant.length > 0) {
			return NextResponse.json(
				{ error: "Name is already used" },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}

		// upload to supabase storage bucket
		const formattedFileName =
			name + "-" + name.split(" ").join("-") + logo.name.split(".").at(-1); // create new name for logo from the tenant name
		const result = await storage.uploadLogo(logo as File, formattedFileName);
		const publicUrl = storage.getPublicPdfUrl(result.path);

		const tenant = await tenantData.insertTenant({
			tenantDto: {
				name,
				email,
				support_email,
				description,
				site_url,
				logo: publicUrl,
				user_id: user.id,
			},
		});

		return NextResponse.json(
			{ data: tenant, message: "Tenant registerd " },
			{ status: StatusCodes.CREATED }
		);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Failed to register tenant." + error },
			{ status: StatusCodes.INTERNAL_SERVER_ERROR }
		);
	}
}

export async function GET() {
	// const session = await auth.api.getSession({
	// 	headers: await headers(),
	// });
	// if (!session) {
	// 	return NextResponse.json(
	// 		{ error: "Unauthorized" },
	// 		{ status: StatusCodes.UNAUTHORIZED }
	// 	);
	// }
	const tenants = await tenantData.getAllTenants();

	return NextResponse.json(
		{ data: tenants, message: "Tenants" },
		{ status: StatusCodes.OK }
	);
}
