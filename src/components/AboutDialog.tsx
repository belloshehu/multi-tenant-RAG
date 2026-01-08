import { Info, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { ITenantType } from "../types/tenants.types";

interface IAboutDialogProps {
	tenant: ITenantType;
	triggerText?: string;
}
const AboutDialog = ({ tenant, triggerText }: IAboutDialogProps) => {
	return (
		<Dialog>
			<DialogTrigger title={"About " + tenant.name}>
				<Button variant={"outline"}>
					<Info className="" /> {triggerText && triggerText}
				</Button>
			</DialogTrigger>

			<DialogContent className="w-full bg-white max-h-[70vh] overflow-y-auto items-start justify-start">
				<h3 className="text-xl font-semibold md:text-2xl md:font-bold">
					About {tenant.name}
				</h3>
				<p>{tenant.description}</p>
			</DialogContent>
		</Dialog>
	);
};

export default AboutDialog;
