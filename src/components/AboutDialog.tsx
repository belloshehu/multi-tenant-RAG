import { Info } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent } from "./ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";

interface IAboutDialogProps {
	title: string;
	description: string;
	triggerText?: string;
}
const AboutDialog = ({
	title,
	description,
	triggerText,
}: IAboutDialogProps) => {
	return (
		<Dialog>
			<DialogTrigger title={title}>
				<Button variant={"outline"}>
					<Info className="" /> {triggerText && triggerText}
				</Button>
			</DialogTrigger>

			<DialogContent className="w-full bg-white max-h-[70vh] overflow-y-auto items-start justify-start">
				<h3 className="text-xl font-semibold md:text-2xl md:font-bold">
					{title}
				</h3>
				<p>{description}</p>
			</DialogContent>
		</Dialog>
	);
};

export default AboutDialog;
