"use client";
import {
	Dialog,
	DialogTitle,
	DialogTrigger,
	DialogContent,
} from "@/src/components/ui/dialog";

import { Users } from "lucide-react";
import TenantForm from "../../forms/TenantForm";
import useToggle from "@/src/hooks/use-toggle";

const AddTenantDialog = ({ buttonText }: { buttonText?: string }) => {
	const { isToggled, toggle } = useToggle();
	return (
		<Dialog
			open={isToggled}
			onOpenChange={toggle}
			data-testid="add-tenant-dialog"
		>
			<DialogTrigger title="Add tenant" data-testid="add-tenant-dialog-content">
				<Users className="text-primary" size={20} data-testid="trigger-svg" />
				{buttonText}
			</DialogTrigger>
			<DialogTitle hidden>add tenant</DialogTitle>

			<DialogContent
				className="w-full bg-white max-h-[70vh] overflow-y-auto"
				data-testid="add-tenant-dialog-content"
			>
				<h3 className="text-xl font-semibold md:font-bold">
					Tenant Registration
				</h3>
				<TenantForm onClose={toggle} />
			</DialogContent>
		</Dialog>
	);
};

export default AddTenantDialog;
