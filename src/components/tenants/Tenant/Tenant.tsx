import { ITenantType } from "@/src/types/tenants.types";
import { Card, CardContent, CardTitle } from "../../ui/card";
import Image from "next/image";
import { useTenant } from "@/src/contexts/tenant-context";
import { cn } from "@/src/lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

interface ITenantProps {
	data: ITenantType;
}

gsap.registerEffect(useGSAP);

const Tenant = ({ data }: ITenantProps) => {
	const { selectTenant, tenant } = useTenant();
	const cardRef = useRef(null);
	useGSAP(() => {
		gsap.from(cardRef.current, {
			x: -100,
			y: -100,
			rotate: 360,
			alpha: 0,
			scale: 0.2,
		});
		gsap.to(cardRef.current, {
			x: 0,
			y: 0,
			rotate: 360,
			alpha: 1,
			scale: 1,
			stagger: 0.1,
		});
	});
	return (
		<Card
			className={cn("p-3 items-center ", {
				"border-[1px] border-green-300": data.id === tenant?.id,
			})}
			onClick={() => {
				selectTenant(data);
			}}
			ref={cardRef}
			aria-label="tenant-card"
			data-testid="tenant-card"
		>
			<Image
				alt="logo"
				src={data.logo}
				width={200}
				height={150}
				className="object-contain w-full h-22 rounded-md "
			/>
			<CardContent className="">
				<CardTitle data-testid="tenant-title" className="font-normal">
					{data.name}
				</CardTitle>
			</CardContent>
		</Card>
	);
};

export default Tenant;
