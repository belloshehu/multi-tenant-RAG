import PageWrapper from "@/src/components/PageWrapper";
import Pricing from "@/src/components/pricing/Pricing";
import { Item, ItemContent, ItemDescription } from "@/src/components/ui/item";
import { pricing } from "@/src/constants";

export default function PricingPage() {
	return (
		<PageWrapper>
			<h1 className="text-xl md:text-3xl mb-5 font-bold">Pricing</h1>
			<Item className="text-xl md:text-3xl" variant={"muted"}>
				<ItemContent>
					<ItemDescription>
						Whether you are large organization with dozens of independend
						document and large unmber of users, or a smaller organization with
						few documents and few users, our pricing plans have got you covered.
					</ItemDescription>
				</ItemContent>
			</Item>

			<section className="w-full gap-8 p-5 mt-10 space-y-5">
				<h3 className="text-md font-medium bg-primary p-2 rounded-sm text-white w-fit">
					Plans
				</h3>
				<div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
					{pricing.map((item) => {
						return <Pricing pricing={item} key={item.title} />;
					})}
				</div>
			</section>
		</PageWrapper>
	);
}
