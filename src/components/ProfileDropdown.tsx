import AboutDialog from "./AboutDialog";
import AddDocumentDialog from "./documents/AddDocumentDialog";
import AddTenantDialog from "./tenants/AddTenantDialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { authClient } from "../lib/auth-client";
import { memo, useState } from "react";
import Avatar from "./Avatar";
import { Separator } from "./ui/separator";
import Link from "next/link";

interface IDocumentDropDownMenu {}

const ProfileDropDownMenu = ({}: IDocumentDropDownMenu) => {
	const [loading, setLoading] = useState(false);
	const { data } = authClient.useSession();

	const handleSignOut = async () => {
		setLoading(true);
		await authClient.signOut().finally(() => {
			setLoading(false);
		});
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				{data && data.user && <Avatar imageUrl={data?.user.image!} />}
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{data && (
					<DropdownMenuItem className="flex flex-col gap-0 items-start justify-start">
						{data.user.name}
						<small>{data.user.email}</small>
					</DropdownMenuItem>
				)}

				<DropdownMenuItem>
					<Link href={"/dashboard/tenants"}>Tenants</Link>
				</DropdownMenuItem>
				<Separator />
				<DropdownMenuItem onClick={handleSignOut}>Log out</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default memo(ProfileDropDownMenu);
