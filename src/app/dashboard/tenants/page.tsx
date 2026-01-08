import AddTenantDialog from "@/src/components/AddTenantDialog";
import TenantTable from "@/src/components/tenants/TenantTable";
import { Badge } from "@/src/components/ui/badge";
import { Item, ItemContent, ItemTitle } from "@/src/components/ui/item";
import { getAllTenants } from "@/src/database/tenants";

export default async function TenantPage() {
	const tenants = await getAllTenants();

	return (
		<div className="w-full  p-5 md:p-20 space-y-10">
			<Item variant={"muted"} className="">
				<ItemTitle>
					Tenants
					<Badge>({tenants && tenants.length | 0})</Badge>
				</ItemTitle>
				<ItemContent className="flex justify-end">
					<AddTenantDialog />
				</ItemContent>
			</Item>
			<TenantTable data={tenants!} />
		</div>
	);
}
