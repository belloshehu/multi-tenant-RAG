import { ITenantType } from "@/src/types/tenants.types";
import { Card, CardContent, CardTitle } from "../ui/card";
import Image from "next/image";
import { useTenant } from "@/src/contexts/tenant-context";
import { cn } from "@/src/lib/utils";
import { File } from "lucide-react";
import { Badge } from "../ui/badge";

interface ITenantProps {
	data: ITenantType;
}
const Tenant = ({ data }: ITenantProps) => {
	const { selectTenant, tenant } = useTenant();
	return (
		<Card
			className={cn("p-3 items-center ", {
				"border-[1px] border-green-300": data.id === tenant?.id,
			})}
			onClick={() => {
				selectTenant(data);
				console.log("clicked");
			}}
		>
			<Image
				alt="logo"
				src={data.logo}
				width={200}
				height={150}
				className="object-cover w-full h-22 rounded-md "
			/>
			<CardContent className="">
				<CardTitle className="font-normal">{data.name}</CardTitle>
			</CardContent>
		</Card>
	);
};

export default Tenant;
