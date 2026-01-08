"use client";
import { LinkIcon, ListMinus, Mail, User } from "lucide-react";
import { authClient } from "../lib/auth-client";
import { useGetAllDocuments } from "../hooks/serivce-hooks/documents.service.hooks";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemHeader,
	ItemMedia,
	ItemTitle,
} from "./ui/item";
import DocumentSelect from "./DocumentSelect";
import { useTenant } from "../contexts/tenant-context";
import { Separator } from "./ui/separator";
import Link from "next/link";
import AboutDialog from "./AboutDialog";

const Sidebar = () => {
	const { data } = authClient.useSession();
	const { data: documents, isLoading } = useGetAllDocuments();
	const { selectedDocument, tenant } = useTenant();

	return (
		<aside className="hidden md:col-span-2 h-screen w-full pt-5 md:flex flex-col items-start justify-start gap-2 p-2 overflow-y-auto">
			<div className="flex p-2 border-[1px] w-full gap-1 rounded-md items-center">
				<User size={20} />
				<h3 className="">Tenant</h3>
			</div>
			<Item variant={"outline"} className="w-full">
				<ItemContent className="w-full flex flex-col items-start">
					{/* Selected tenant */}
					{tenant ? (
						<Item
							variant={"outline"}
							className="w-full flex flex-col items-start"
						>
							<ItemContent>
								<ItemTitle className="w-full mb-3">
									{tenant.name}
									<Link target="_blank" href={tenant.site_url} className="">
										<LinkIcon size={20} />
									</Link>
									<Link
										target="_blank"
										href={"mailto:" + tenant.support_email}
										className=""
									>
										<Mail size={20} />
									</Link>
									<AboutDialog tenant={tenant} />
								</ItemTitle>
								{/* Documents of the selected tenant  */}
								{documents ? (
									<DocumentSelect documents={documents || []} />
								) : (
									<Item variant={"outline"} className="w-full">
										<ItemContent>
											<ItemTitle>
												<ItemMedia>
													<ListMinus />
												</ItemMedia>
												No documents
											</ItemTitle>
											<ItemDescription>
												No document to interact with. You can try again later
												after documents are added.
											</ItemDescription>
										</ItemContent>
									</Item>
								)}
							</ItemContent>
						</Item>
					) : (
						<Item variant={"outline"}>
							<ItemContent>
								<ItemDescription>Select a target tenant</ItemDescription>
							</ItemContent>
						</Item>
					)}

					{/* Selected document */}
					{selectedDocument && (
						<Item variant={"outline"}>
							<ItemHeader className="p-0">
								<ItemTitle>{selectedDocument?.name}</ItemTitle>
								<ItemMedia>
									<ItemActions>
										<LinkIcon className="text-green-400" size={16} />
									</ItemActions>
								</ItemMedia>
							</ItemHeader>

							<Separator className="p-0" />
							<ItemContent>
								<p>{selectedDocument?.description}</p>
							</ItemContent>
						</Item>
					)}
				</ItemContent>
			</Item>
		</aside>
	);
};

export default Sidebar;
