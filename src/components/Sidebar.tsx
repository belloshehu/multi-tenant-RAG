"use client";
import { LinkIcon, Mail, MessageCircle, Users } from "lucide-react";
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
import { Button } from "./ui/button";
import Image from "next/image";

const Sidebar = () => {
	const { data: documents, isLoading } = useGetAllDocuments();
	const { selectedDocument, tenant, toggleContent, content } = useTenant();

	const renderSelectedDocument = () => {
		if (!selectedDocument) return null;
		return (
			<Item variant={"outline"}>
				<ItemHeader className="p-0">
					<ItemTitle>{selectedDocument?.name}</ItemTitle>
					<ItemMedia>
						<ItemActions>
							<Link href={selectedDocument.fileUrl} target="_blank">
								<LinkIcon className="text-green-400" size={16} />
							</Link>
						</ItemActions>
					</ItemMedia>
				</ItemHeader>

				<Separator className="p-0" />
				<ItemContent>
					<p>{selectedDocument?.description}</p>
				</ItemContent>
			</Item>
		);
	};
	return (
		<aside className="hidden md:col-span-2 h-screen w-full pt-5 md:flex flex-col items-start justify-start gap-2 p-2 overflow-y-auto">
			{/* Selected tenant */}
			{tenant ? (
				<>
					<Button onClick={toggleContent} className="mb-2 w-full">
						{content === "chat" ? <Users /> : <MessageCircle />}
						{content === "tenants"
							? `Chat with ${tenant.name}`
							: `Go back to tenents list`}
					</Button>

					<Item
						variant={"outline"}
						className="w-full flex flex-col items-start"
					>
						<ItemContent className="w-full">
							<ItemTitle className="w-full mb-3">
								<ItemMedia>
									<Image
										src={tenant.logo}
										height={8}
										width={8}
										alt="logo"
										className="object-cover aspect-auto object-center h-8 w-8"
									/>
								</ItemMedia>
								{tenant.name}
								<Link
									target="_blank"
									href={tenant.site_url}
									className="ml-auto"
								>
									<LinkIcon size={20} />
								</Link>
								<Link
									target="_blank"
									href={"mailto:" + tenant.support_email}
									className=""
								>
									<Mail size={20} />
								</Link>
								<AboutDialog
									title={"About " + tenant.name}
									description={tenant.description!}
								/>
							</ItemTitle>
							{/* Documents of the selected tenant  */}
							{documents ? (
								<DocumentSelect documents={documents || []} />
							) : (
								<Item variant={"outline"} className="w-full">
									<ItemContent>
										<ItemTitle>No documents</ItemTitle>
										<ItemDescription>
											No document to interact with. You can try again later
											after documents are added.
										</ItemDescription>
									</ItemContent>
								</Item>
							)}
						</ItemContent>
					</Item>
				</>
			) : (
				<Item variant={"outline"} className="w-full">
					<ItemMedia>
						<Users />
					</ItemMedia>
					<ItemContent>Select a tenant to chat with</ItemContent>
				</Item>
			)}

			{/* Selected document */}
			{renderSelectedDocument()}
		</aside>
	);
};

export default Sidebar;
