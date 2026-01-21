import TenantDetailPageClient from "@/src/components/tenants/TenantDetailPageClient";

type Params = Promise<{ id: string }>;

export default async function TenantDetailPage(props: { params: Params }) {
	const params = await props.params;

	return <TenantDetailPageClient id={parseInt(params.id)} />;
}
