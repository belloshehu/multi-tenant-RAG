import TenantPublicDetailPageClient from "@/src/components/tenants/TenantPublicDetailPageContent";

type Params = Promise<{ id: number }>;
export default async function TenantDetailPage({ params }: { params: Params }) {
	const { id } = await params;
	// const tenant = useGetTenantById(parseInt(id as string));
	return <TenantPublicDetailPageClient id={id} />;
}
