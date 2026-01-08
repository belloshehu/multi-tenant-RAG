"use client";
import {
	Dialog,
	DialogTitle,
	DialogTrigger,
	DialogContent,
} from "@/src/components/ui/dialog";

import { Users } from "lucide-react";
import { Button } from "./ui/button";
import TenantForm from "./forms/TenantForm";

const AddTenantDialog = ({ buttonText }: { buttonText?: string }) => {
	return (
		<Dialog>
			<DialogTrigger title="Add tenant">
				<Button variant={"outline"} className="rounded-full p-0 w-8 h-8">
					<Users className="text-primary" />
					{buttonText}
				</Button>
			</DialogTrigger>
			<DialogTitle hidden>add tenant</DialogTitle>

			<DialogContent className="w-full bg-white max-h-[70vh] overflow-y-auto">
				<h3 className="text-xl font-semibold md:font-bold">
					Tenant Registration
				</h3>
				<TenantForm />
			</DialogContent>
		</Dialog>
	);
};

export default AddTenantDialog;
