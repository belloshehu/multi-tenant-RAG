import { Info, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";

const AboutDialog = () => {
	return (
		<Dialog>
			<DialogTrigger>
				<Button variant={"outline"}>
					<Info className="" /> About
				</Button>
			</DialogTrigger>
			<DialogTitle hidden>About techbot</DialogTitle>

			<DialogContent className="w-full bg-white max-h-[70vh] overflow-y-auto items-start justify-start">
				<h3 className="text-xl font-semibold md:text-2xl md:font-bold">
					About Techbot
				</h3>
				<p>
					This RAG chatbot answers questions in a friendly about the uploaded
					knowledge source (An arduino based fingerprint biometric attendance
					system).
				</p>

				<p>
					In the case where the question is not answered, an email address is
					provided to the user to contact the support team. The knowledge source
					is available to full access
				</p>
			</DialogContent>
		</Dialog>
	);
};

export default AboutDialog;
