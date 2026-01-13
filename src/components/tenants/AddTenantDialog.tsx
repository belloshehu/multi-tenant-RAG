"use client";
import {
	Dialog,
	DialogTitle,
	DialogTrigger,
	DialogContent,
} from "@/src/components/ui/dialog";

import { Users } from "lucide-react";
import { Button } from "../ui/button";
import TenantForm from "../forms/TenantForm";
import { useState } from "react";

const AddTenantDialog = ({ buttonText }: { buttonText?: string }) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<Dialog open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
			<DialogTrigger title="Add tenant">
				<Users className="text-primary" size={20} />
				{buttonText}
			</DialogTrigger>
			<DialogTitle hidden>add tenant</DialogTitle>

			<DialogContent className="w-full bg-white max-h-[70vh] overflow-y-auto">
				<h3 className="text-xl font-semibold md:font-bold">
					Tenant Registration
				</h3>
				<TenantForm onClose={() => setIsOpen(false)} />
			</DialogContent>
		</Dialog>
	);
};

export default AddTenantDialog;
