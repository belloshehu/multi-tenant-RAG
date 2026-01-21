"use client";
import { ITenantType } from "@/src/types/tenants.types";
import Tenant from "../Tenant/Tenant";
import { Spinner } from "../../ui/spinner";
import { Badge } from "../../ui/badge";

interface ITenantListProps {
	data: ITenantType[] | null;
	loading: boolean;
}
const TenantList = ({ data, loading }: ITenantListProps) => {
	if (loading)
		return (
			<Badge>
				<Spinner /> Loading tenants
			</Badge>
		);
	if (!data || data.length === 0) return <h3>Empty tenants</h3>;

	return (
		<ul
			className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
			data-testid="tenant-list"
		>
			{data.map((tenant) => (
				<Tenant data={tenant} key={tenant.id} />
			))}
		</ul>
	);
};

export default TenantList;
