"use client";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { PricingType } from "@/src/types/index.types";
import { Button } from "../ui/button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerEffect(useGSAP);

const Pricing = ({ pricing }: { pricing: PricingType }) => {
	useGSAP(() => {
		gsap.fromTo(
			".pricing",
			{ y: "-10%", opacity: 0 },
			{ y: "0%", opacity: 1, stagger: 0.2, ease: "power1.in" }
		);

		// list item
		gsap.fromTo(
			".benefit",
			{ y: "-100%", opacity: 0 },
			{ y: "0%", opacity: 1, stagger: 0.1 }
		);

		// button
		gsap.fromTo(
			"#pricing-btn",
			{ y: "-10%", opacity: 0 },
			{ y: "0%", opacity: 1, stagger: 0.2, ease: "bounce.inOut", delay: 0.2 }
		);
	});
	return (
		<Card key={pricing.title} className="pricing">
			<CardHeader className="border-b-[1px]">
				<CardTitle className="flex justify-between">
					{pricing.title}{" "}
					<Badge>
						{pricing.currency}
						{pricing.cost} {pricing.duration}
					</Badge>
				</CardTitle>
			</CardHeader>
			<CardContent>
				{/* <Separator /> */}
				<ul className="list-disc p-2 md:px-5 text-sm " id="benefits-list">
					{pricing.benefits.map((benefit, index) => (
						<li key={index} className="benefit">
							{benefit}
						</li>
					))}
				</ul>
			</CardContent>
			<CardFooter>
				<Button id="pricing-btn">Get Started</Button>
			</CardFooter>
		</Card>
	);
};

export default Pricing;
