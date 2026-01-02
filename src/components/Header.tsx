"use client";
import { Bot, LogIn } from "lucide-react";
import { useEffect, useState } from "react";
// import { fetchKnowledgeSource } from "../actions/read-knowledge-source";
import MenuDialog from "./MenuDialog";
import { Button } from "./ui/button";

const Header = () => {
	const [text, setText] = useState("");
	useEffect(() => {
		getKnowledgeSource();
	}, []);

	const getKnowledgeSource = async () => {
		// const data = await fetchKnowledgeSource();
		const data: any = null;
		if (data?.data) {
			setText(data.data);
		}
	};

	return (
		<header className="w-full p-5 py-2 border-orange-400 border-0  mx-auto shadow-sm flex justify-start gap-3 items-center bg-gradient-to-b from-green-600 via-green-400 to-green-600 ">
			<Bot className="text-white" size={30} />
			<h1 className="text-xl font-semibold text-white font-mono mr-auto">
				Multi Tenant
			</h1>
			<Button variant={"outline"}>
				<LogIn /> Login
			</Button>
			<MenuDialog knowledgeSourceText={text} />
		</header>
	);
};

export default Header;
