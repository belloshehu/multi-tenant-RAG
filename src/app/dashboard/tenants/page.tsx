import PageWrapper from "@/src/components/PageWrapper";
import AddTenantDialog from "@/src/components/tenants/AddTenantDialog";
import TenantTable from "@/src/components/tenants/TenantTable";
import { Badge } from "@/src/components/ui/badge";
import { Item, ItemContent, ItemTitle } from "@/src/components/ui/item";
import { TenantServiceAPI } from "@/src/services/tenants.service";

export default async function TenantPage() {
	const tenants = await TenantServiceAPI.getAllTenants();
	return (
		<PageWrapper>
			<Item variant={"muted"} className="">
				<ItemTitle>
					Tenants
					<Badge>({tenants && tenants?.length | 0})</Badge>
				</ItemTitle>
				<ItemContent className="flex justify-end">
					<AddTenantDialog />
				</ItemContent>
			</Item>
			<TenantTable data={tenants!} />
		</PageWrapper>
	);
}
