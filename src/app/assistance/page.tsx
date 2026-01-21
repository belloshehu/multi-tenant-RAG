"use client";
import PageWrapper from "@/src/components/PageWrapper";
import { Button } from "@/src/components/ui/button";
import { Item, ItemContent, ItemDescription } from "@/src/components/ui/item";
import { Textarea } from "@/src/components/ui/textarea";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUp, Bot } from "lucide-react";
import { useState } from "react";

export default function AIAssistancePage() {
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
	return (
		<PageWrapper className="w-full grid grid-cols-8 gap-0 md:gap-5">
			<section className="col-span-8 md:col-span-5 w-full h-fit">
				<h1 className="text-xl md:text-3xl mb-5 font-bold">AI Assistance</h1>
				<Item className="text-xl md:text-3xl" variant={"muted"}>
					<ItemContent>
						<ItemDescription>
							Have some questions to ask about our products? Do not hesitate to
							chat with "Ragly": our AI agent that answers all question both
							technical and non-technical
						</ItemDescription>
						<Button
							className="w-fit my-5"
							// onClick={toggle}
							data-testid="toggle-btn"
						>
							<Bot />
							Chat with Ragly
						</Button>
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
	);
}
