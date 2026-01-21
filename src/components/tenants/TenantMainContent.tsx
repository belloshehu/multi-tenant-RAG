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
import TenantList from "@/src/components/tenants/TenantList/TenantList";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";

// gsap.registerEffect(useGSAP);
// gsap.registerPlugin(SplitText);

export default function TenantMainContent() {
	const { tenant } = useTenant();
	const { data: tenants, isLoading } = useGetAllTenants();

	useGSAP(() => {
		const headingText = new SplitText("#hero-heading", {
			type: "chars, words",
		});
		gsap.from(".item", {
			y: "-100%",
			opacity: 0,
			scale: 0.4,
		});
		gsap.to(".item", {
			y: "0%",
			opacity: 1,
			stagger: 0.2,
			scale: 1,
			ease: "power1.inOut",
		});
		gsap.from(
			headingText.chars,

			{
				// xPercent: 40,
				yPercent: 50,
				ease: "expo.in",
				stagger: 0.01,
				fontSize: 1.5,
				// duration: 0.2,
			}
		);
	}, []);

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
					<Badge>{tenants ? tenants?.length : 0}</Badge>
				</ItemTitle>
			</Item>

			{tenant && (
				<Item
					variant={"muted"}
					className="w-full flex justify-between rounded-full item"
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
				<div className="space-y-5">
					<h1
						//className="text-xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-gray-500  to-gray-900"
						className="text-xl md:text-5xl font-bold text-shadow-green-500"
						id="hero-heading"
					>
						Multi Tenant Support System
					</h1>
					<ItemGroup className="gap-5">
						{heroItems.map((item, index) => {
							return (
								<Item variant={"muted"} key={index} className="item">
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
				</div>
			)}
		</section>
	);
}
