"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

interface NavLinkProps {
	href: "/developer" | "/docs" | "/pricing" | "/assistance";
	name: "Developer" | "Pricing" | "Docs" | "Assistance";
}

gsap.registerEffect(useGSAP);
const NavLink = ({ href, name }: NavLinkProps) => {
	const pathname = usePathname();
	const spanRef = useRef(null);
	useGSAP(() => {
		gsap.fromTo(
			spanRef.current,
			{ y: "-10%", opacity: 0, width: "0%", borderRadius: 0 },
			{
				y: "0%",
				opacity: 1,
				width: "50%",
				borderRadius: 10,
				rotate: 360,
				ease: "bounce.inOut",
				yoyo: true,
				repeat: 2,
			}
		);
	});
	return (
		<Link
			href={href}
			className={cn("flex flex-col relative", {
				"text-green-400": pathname.startsWith(href),
			})}
		>
			{name}
			<span
				ref={spanRef}
				className={cn("absolute -bottom-2 transition-all duration-200", {
					"border-2 rounded-full border-green-400 w-2/3 group-hover:w-[100%]":
						pathname.startsWith(href),
				})}
			/>
		</Link>
	);
};

export default NavLink;
