"use client";
import { Bot, LogInIcon } from "lucide-react";
import { Button } from "./ui/button";
import { authClient } from "../lib/auth-client";
import ProfileDropDownMenu from "./ProfileDropdown";
import AddTenantDialog from "./tenants/AddTenantDialog/AddTenantDialog";
import Link from "next/link";
import NavLink from "./NavLink";
import { Montaga } from "next/font/google";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const alegreyaSans = Montaga({
	variable: "--font-alegreya",
	subsets: ["latin"],
	weight: "400",
});

const Header = () => {
	useGSAP(() => {
		const headerTween = gsap.timeline({
			scrollTrigger: {
				trigger: "header",
				start: "bottom top",
			},
		});
		headerTween.fromTo(
			"header",
			{ backgroundColor: "transparent" },
			{
				backgroundColor: "#ffffff50",
				backgroundFilter: "blur(10px)",
				duration: 1,
				ease: "power1.inOut",
			}
		);
	});

	const { data } = authClient.useSession();

	const handleLoginWithGoogle = async () => {
		authClient.signIn.social({ provider: "google" });
	};
	return (
		<header className="w-full p-5 py-2 fixed top-0 left-0 border-[1px]  mx-auto flex justify-start gap-2 items-center bg-gradient-to-e from-green-600 via-green-400 to-green-600 ">
			<Link href={"/"} className="flex items-center gap-1 mr-10 text-green-400">
				<Bot className="text-green-400 " size={30} />
				<h1 className={`text-md font-bold ${alegreyaSans.className} `}>
					Opsyst
				</h1>
			</Link>
			<nav className="mr-auto flex items-center justify-start gap-5">
				<NavLink href="/developer" name="Developer" />
				<NavLink href="/pricing" name="Pricing" />
				<NavLink href="/docs" name="Docs" />
				<NavLink href="/assistance" name="Assistance" />
			</nav>
			{!data && (
				<Button
					variant={"outline"}
					onClick={handleLoginWithGoogle}
					className="mr-2"
				>
					<LogInIcon /> Login
				</Button>
			)}
			{data && data.user && (
				<>
					<AddTenantDialog />
					<ProfileDropDownMenu />
				</>
			)}
		</header>
	);
};

export default Header;
