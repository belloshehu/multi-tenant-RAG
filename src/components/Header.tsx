"use client";
import { Bot, LogIn, LogInIcon, User } from "lucide-react";
import { useEffect, useState } from "react";
// import { fetchKnowledgeSource } from "../actions/read-knowledge-source";
import MenuDialog from "./MenuDialog";
import { Button } from "./ui/button";
import { authClient } from "../lib/auth-client";
import Avatar from "./Avatar";

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
			<Bot className="text-green-400 " size={30} />
			<h1 className="text-md font-semibold mr-auto">Multi Tenant</h1>
			{!data && (
				<Button
					variant={"outline"}
					onClick={handleLoginWithGoogle}
					className="mr-2"
				>
					<LogInIcon /> Login
				</Button>
			)}
			<MenuDialog knowledgeSourceText={text} />
		</header>
	);
};

export default Header;
