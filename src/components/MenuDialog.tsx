import { Database, File, Menu } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/src/components/ui/dialog";
import { authClient } from "../lib/auth-client";
import { Button } from "./ui/button";
import { useState } from "react";
import { Separator } from "./ui/separator";
import Avatar from "./Avatar";
import DashboardDocumentDialog from "./DashboardDocumentDialog";
import AddTenantDialog from "./tenants/AddTenantDialog";

const MenuDialog = ({
	knowledgeSourceText,
}: {
	knowledgeSourceText: string;
}) => {
	const { data } = authClient.useSession() as { data: { user: any } };
	const [loading, setLoading] = useState(false);

	const handleSignOut = async () => {
		setLoading(true);
		await authClient.signOut().finally(() => {
			setLoading(false);
		});
	};

	return (
		<Dialog>
			<DialogTrigger>
				{data && data.user ? (
					<Avatar imageUrl={data?.user.image!} />
				) : (
					<Menu className="" />
				)}
			</DialogTrigger>
			<DialogTitle hidden>Menu dialog</DialogTitle>

			<DialogContent className="w-full bg-white max-h-[70vh] overflow-y-auto flex flex-col items-start justify-start">
				<div className="flex flex-reverse items-center w-full justify-between">
					{data && data.user && <h3>Hello {data.user.name}!</h3>}
				</div>
				<Separator />
				{data && data?.user.role === "admin" && (
					<nav>
						<ul>
							<li>
								<File /> Documents
							</li>
							<li>
								<Database /> Storage
							</li>
						</ul>
					</nav>
				)}
				<DashboardDocumentDialog />
				<AddTenantDialog />
				<Separator />
				<Button
					variant={"destructive"}
					className="w-full"
					onClick={handleSignOut}
				>
					Log out
				</Button>
			</DialogContent>
		</Dialog>
	);
};

export default MenuDialog;
