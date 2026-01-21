import PageWrapper from "@/src/components/PageWrapper";
import { Button } from "@/src/components/ui/button";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemTitle,
} from "@/src/components/ui/item";

export default function DeveloperPage() {
	return (
		<div className="w-full col-span-6">
			<h1 className="text-xl md:text-3xl mb-5 font-bold">Developer</h1>
			<Item className="text-xl md:text-3xl" variant={"muted"}>
				<ItemContent>
					<ItemDescription>
						We have a whole lot of ways you can follow to integrate multi-tenant
						RAG system into your appliction.
					</ItemDescription>
				</ItemContent>
			</Item>

			<ItemGroup className=" p-5 mt-10 space-y-5 w-full ">
				<h3 className="font-medium">Integration guide</h3>

				<Item variant={"outline"} className="px-5">
					<ItemContent>
						<ItemTitle>Create account</ItemTitle>
						<ItemDescription>
							Start by creating an account or login if you already have.
						</ItemDescription>
						<Button variant={"outline"} className="w-fit">
							Create account
						</Button>
					</ItemContent>
				</Item>

				<Item variant={"outline"} className="">
					<ItemContent>
						<ItemTitle>Add tenant</ItemTitle>
						<ItemDescription>
							Add tenant to your account. You can add as many tenants as your
							subscription plan allows.
						</ItemDescription>
					</ItemContent>
				</Item>

				<Item variant={"outline"} className="">
					<ItemContent>
						<ItemTitle>Add documents</ItemTitle>
						<ItemDescription>
							Add document to your tenants. You can add as many document as your
							subscription plan allows. A document must pdf pdf file
						</ItemDescription>
					</ItemContent>
				</Item>

				<Item variant={"outline"} className="">
					<ItemContent>
						<ItemTitle>Index documents</ItemTitle>
						<ItemDescription>
							Go to your dashboard and index the documents you uploaded.
							Indexing your documents will add them to the database that the
							chatbot can retrieve from.
						</ItemDescription>
					</ItemContent>
				</Item>

				<Item variant={"outline"} className="">
					<ItemContent>
						<ItemTitle>Activate document</ItemTitle>
						<ItemDescription>
							Finally, you need to activate uploaded documents to before they
							can be listed under their tenant. Without activation, document
							will be not available for selection.
						</ItemDescription>
					</ItemContent>
				</Item>
			</ItemGroup>
		</div>
	);
}
