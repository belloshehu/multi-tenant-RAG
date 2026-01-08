import { ITenantType } from "@/src/types/tenants.types";
import { Card, CardTitle } from "../ui/card";
import Image from "next/image";
import { useTenant } from "@/src/contexts/tenant-context";
import { cn } from "@/src/lib/utils";

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
				width={100}
				height={80}
				className="object-cover w-full h-22 rounded-md "
			/>
			<CardTitle className="font-normal  text-md">{data.name}</CardTitle>
		</Card>
	);
};

export default Tenant;
