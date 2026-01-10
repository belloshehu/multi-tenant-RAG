import AddDocumentDialog from "@/src/components/documents/AddDocumentDialog";
import DocumentTable from "@/src/components/documents/DocumentTable";
import PageWrapper from "@/src/components/PageWrapper";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
} from "@/src/components/ui/item";
import { getAllDocuments } from "@/src/database/documents";
import { getTenantById } from "@/src/database/tenants";
import { Globe, Mail, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Params = Promise<{ id: string }>;
export default async function TenantDetailPage(props: { params: Params }) {
	const params = await props.params;
	const tenant = await getTenantById(params.id);
	const documents = await getAllDocuments();

	return (
		<PageWrapper>
			{tenant ? (
				<section className="flex flex-col justify-start items-start w-full gap-8">
					{/* Headder item */}
					<Item variant={"outline"} className="w-full relative">
						<Button
							className="absolute top-2 right-2 rounded-full"
							variant={"outline"}
						>
							<Pencil size={30} />
						</Button>
						<ItemContent>
							<ItemTitle className="text-xl md:text-5xl w-full">
								<ItemMedia>
									<Image
										src={tenant.logo}
										alt="logo"
										width={100}
										height={100}
										className="rounded-full w-32 h-32 border-2 aspect-square object-center object-cover"
									/>
								</ItemMedia>
								{tenant.name}
								<div className="ml-auto text-green-300 gap-5 space-y-8">
									<Link href={tenant.site_url} title="website">
										<Globe size={20} />
									</Link>
									<Link
										href={`mailto:${tenant.support_email}`}
										title="support email"
									>
										<Mail size={20} />
									</Link>
								</div>
							</ItemTitle>
							{/* Add more tenant details here */}
						</ItemContent>
					</Item>
					{/* About section item */}
					<Item>
						<ItemContent>
							<ItemTitle>About {tenant.name}</ItemTitle>
							<ItemDescription>{tenant.description}</ItemDescription>
						</ItemContent>
					</Item>

					{/* Documents table */}
					<Item>
						<ItemContent>
							<ItemTitle className="bg-gray-100 rounded-sm shadow-sm w-full p-2">
								Documents <Badge className="mr-auto">{documents?.length}</Badge>
								<AddDocumentDialog />
							</ItemTitle>
							<DocumentTable data={documents!} />
						</ItemContent>
					</Item>
				</section>
			) : (
				<Item>
					<ItemContent>
						<ItemTitle>Invalid tenant</ItemTitle>
						<ItemDescription>Tenant not found</ItemDescription>
					</ItemContent>
				</Item>
			)}
		</PageWrapper>
	);
}
