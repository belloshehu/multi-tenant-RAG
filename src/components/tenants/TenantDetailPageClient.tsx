"use client";

import AddDocumentDialog from "@/src/components/documents/AddDocumentDialog";
import DocumentTable from "@/src/components/documents/DocumentTable/DocumentTable";
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
import { Globe, Mail, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Loader from "../Loader";
import { useGetTenantById } from "@/src/hooks/serivce-hooks/tenants.service.hooks";

export default function TenantDetailPageClient({ id }: { id: number }) {
	const { data: tenant, isLoading } = useGetTenantById(id);
	if (isLoading) return <Loader fullScreen />;
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
					<Item className="w-full md:w-3/5">
						<ItemContent className="w-full">
							<ItemTitle className="bg-gray-100 rounded-sm shadow-sm w-full p-2 mb-3">
								Documents{" "}
								<Badge className="mr-auto">{tenant.documents?.length}</Badge>
								<AddDocumentDialog tenant_id={tenant.id} />
							</ItemTitle>
							<DocumentTable data={tenant.documents!} />
						</ItemContent>
					</Item>
				</section>
			) : (
				<Item variant={"muted"}>
					<ItemContent>
						<ItemTitle className="text-xl md:text-2xl font-bold">
							Invalid tenant
						</ItemTitle>
						<ItemDescription>Tenant not found</ItemDescription>
					</ItemContent>
				</Item>
			)}
		</PageWrapper>
	);
}
