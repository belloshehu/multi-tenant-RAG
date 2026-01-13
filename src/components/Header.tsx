"use client";
import { Bot, LogInIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { authClient } from "../lib/auth-client";
import ProfileDropDownMenu from "./ProfileDropdown";
import AddTenantDialog from "./tenants/AddTenantDialog";
import Link from "next/link";

const Header = () => {
	const [text, setText] = useState("");
	useEffect(() => {
		getKnowledgeSource();
	}, []);

	const { data } = authClient.useSession();

	const getKnowledgeSource = async () => {
		// const data = await fetchKnowledgeSource();
		const data: any = null;
		if (data?.data) {
			setText(data.data);
		}
	};

	const handleLoginWithGoogle = async () => {
		authClient.signIn.social({ provider: "google" });
	};
	return (
		<header className="w-full p-5 py-2 fixed top-0 left-0 border-[1px] bg-white  mx-auto shadow-sm flex justify-start gap-2 items-center bg-gradient-to-e from-green-600 via-green-400 to-green-600 ">
			<Link href={"/"} className="mr-auto flex items-center gap-1">
				<Bot className="text-green-400 " size={30} />
				<h1 className="text-md font-semibold ">Multi Tenant</h1>
			</Link>
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
