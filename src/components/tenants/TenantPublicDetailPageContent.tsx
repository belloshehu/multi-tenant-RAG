/*
 * Public tenant detail page that users can access without restriction using a tenant's ur
 *
 *
 */

"use client";

import PageWrapper from "@/src/components/PageWrapper";
import { Button } from "@/src/components/ui/button";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
} from "@/src/components/ui/item";
import { ArrowUp, Bot, Globe, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Loader from "../Loader";
import { useGetTenantById } from "@/src/hooks/serivce-hooks/tenants.service.hooks";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function TenantPublicDetailPageClient({ id }: { id: number }) {
	const { data: tenant, isLoading } = useGetTenantById(id);

	useGSAP(() => {
		gsap.fromTo(
			"#send-btn",
			{
				y: -10,
			},
			{
				y: 10,
				yoyo: true,
				repeat: -1,
				delay: 0.5,
			}
		);
	});
	const [text, setText] = useState("");

	if (isLoading) return <Loader fullScreen message="Loading tenant..." />;

	return (
		<PageWrapper>
			{tenant ? (
				<PageWrapper className="w-full grid grid-cols-8 gap-0 md:gap-5">
					<section className="col-span-8 md:col-span-5 w-full h-fit">
						{/* Headder item */}
						<Item variant={"outline"} className="w-full relative">
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
					</section>

					<section
						className="col-span-8 md:col-span-3 flex flex-col justify-end border-[1px] p-3 h-full rounded-md"
						data-testid="chat-section"
					>
						<div className="flex-1 h-full" data-testid="chat-messages"></div>
						<div className="relative">
							<Textarea
								name="chat"
								cols={10}
								rows={20}
								className="h-36 bg-white"
								placeholder="Ask a question"
								onChange={(e) => setText(e.target.value)}
							/>
							<Button
								data-testid="send-btn"
								variant={"outline"}
								className="rounded-full w-8 h-8 absolute bottom-2 right-2"
								id="send-btn"
								disabled={text === ""}
							>
								<ArrowUp className="text-green-400" />
							</Button>
						</div>
					</section>
				</PageWrapper>
			) : (
				<Item variant={"muted"}>
					<ItemContent>
						<ItemTitle className="text-xl md:text-2xl font-bold">
							Invalid tenant
						</ItemTitle>
						<ItemDescription>Tenant not found</ItemDescription>
					</ItemContent>
					<Link href={"/"}>
						<Button variant={"default"}>Explore other tenants</Button>
					</Link>
				</Item>
			)}
		</PageWrapper>
	);
}
