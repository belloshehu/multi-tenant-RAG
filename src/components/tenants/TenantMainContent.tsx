"use client";
import { File } from "lucide-react";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemMedia,
	ItemTitle,
} from "@/src/components/ui/item";
import { useTenant } from "@/src/contexts/tenant-context";
import { cn } from "@/src/lib/utils";
import { heroItems } from "@/src/constants";
import SearchInput from "@/src/components/form-fields/SearchInput";
import { Badge } from "@/src/components/ui/badge";
import { useGetAllTenants } from "@/src/hooks/serivce-hooks/tenants.service.hooks";
import TenantList from "@/src/components/tenants/TenantList";

export default function TenantMainContent() {
	const { selectedDocument, tenant } = useTenant();
	const { data: tenants, isLoading } = useGetAllTenants();

	return (
		<section
			className={cn(
				"col-span-5 flex flex-col gap-5 border-[1px] w-full h-full justify-start overflow-y-auto rounded-4xl p-2 md:p-5 md:py-2"
			)}
		>
			<Item
				variant={"muted"}
				className="w-full flex justify-between rounded-full"
			>
				<ItemContent className="w-1/2">
					<SearchInput
						placeholder="Enter tenant's name"
						onChange={() => {}}
						onSubmit={() => {}}
					/>
				</ItemContent>
				<ItemTitle className="">
					Tenants
					<Badge>{tenants && tenants.length | 0}</Badge>
				</ItemTitle>
			</Item>

			{tenant && (
				<Item
					variant={"muted"}
					className="w-full flex justify-between rounded-full"
				>
					<ItemContent>
						Search for a tenant, select a document relevant to your question and
						start to interact with it.
					</ItemContent>
				</Item>
			)}

			{tenants ? (
				<TenantList data={tenants!} loading={isLoading} />
			) : (
				<ItemGroup className="gap-5">
					{heroItems.map((item, index) => {
						return (
							<Item variant={"muted"} key={index}>
								<ItemContent>
									<ItemTitle className="text-green-500">
										{index === 0 && (
											<ItemMedia>
												<File size={20} />
											</ItemMedia>
										)}
										{item.title}
									</ItemTitle>
									<ItemDescription>{item.description}</ItemDescription>
								</ItemContent>
							</Item>
						);
					})}
				</ItemGroup>
			)}
		</section>
	);
}
