import PageWrapper from "@/src/components/PageWrapper";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/src/components/ui/card";
import { Item, ItemContent, ItemDescription } from "@/src/components/ui/item";

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
					<Card>
						<CardHeader className="border-b-[1px]">
							<CardTitle className="flex justify-between">
								Free plan <Badge>$0 for one month</Badge>
							</CardTitle>
						</CardHeader>
						<CardContent>
							{/* <Separator /> */}
							<ul className="list-disc p-2 md:px-5 text-sm">
								<li>1 document upload</li>
								<li>0 private documents upload</li>
								<li>Upto 1000 free chats </li>
								<li>Monthly unlimited document update</li>
							</ul>
						</CardContent>
						<CardFooter>
							<Button>Get Started</Button>
						</CardFooter>
					</Card>
					<Card>
						<CardHeader className="border-b-[1px]">
							<CardTitle className="w-full flex justify-between">
								Premium 1 plan <Badge>$10 monthly</Badge>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<ul className="list-disc p-2 md:px-5 text-sm">
								<li>5 documents upload</li>
								<li>Upload upto 2 private documents</li>
								<li>Upto 20,000 chats </li>
								<li>Monthly unlimited document update</li>
							</ul>
						</CardContent>
						<CardFooter>
							<Button>Get Started</Button>
						</CardFooter>
					</Card>
					<Card>
						<CardHeader className="border-b-[1px]">
							<CardTitle className="flex justify-between">
								Premium 2 plan
								<Badge>$20 monthly</Badge>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<ul className="list-disc p-2 md:px-5 text-sm">
								<li>20 documents upload</li>
								<li>Upload upto 10 private documents</li>
								<li>Upto 50,000 chats </li>
								<li>Monthly unlimited document update</li>
							</ul>
						</CardContent>
						<CardFooter>
							<Button>Get Started</Button>
						</CardFooter>
					</Card>
				</div>
			</section>
		</PageWrapper>
	);
}
