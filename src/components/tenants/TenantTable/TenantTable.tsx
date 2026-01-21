import React from "react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../ui/table";
import { Badge } from "../../ui/badge";
import { formatDate } from "../../../lib/timedate";
import { ITenantType } from "../../../types/tenants.types";
import Image from "next/image";
import Link from "next/link";

interface ItenantTableProps {
	data: ITenantType[] | null;
}
const TenantTable = ({ data }: ItenantTableProps) => {
	if (!data || data.length === 0) return <Badge>No tenants</Badge>;
	return (
		<Table className="w-full md:w-3/5">
			<TableCaption>A list of tenants.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">Name</TableHead>
					<TableHead>Created At</TableHead>
					<TableHead>Active</TableHead>
					<TableHead>Verified</TableHead>
					<TableHead>Website</TableHead>
					<TableHead>Logo</TableHead>
					<TableHead>Documents</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody data-testid="table-body">
				{data.map((tenant) => {
					return (
						<TableRow key={tenant.id} data-testid="table-row">
							<TableCell className="font-medium">
								<Link href={`/dashboard/tenants/${tenant.id}`}>
									{tenant.name}
								</Link>
							</TableCell>
							<TableCell>{formatDate(tenant.created_at!)}</TableCell>
							<TableCell>{tenant.active ? "Yes" : "No"}</TableCell>
							<TableCell>{tenant.active ? "Yes" : "No"}</TableCell>
							<TableCell>
								<Link target="_blank" href={tenant.site_url}>
									{tenant.site_url}
								</Link>
							</TableCell>
							<TableCell content="">
								<Image
									src={tenant.logo}
									alt="logo"
									width={20}
									height={20}
									className="object-contain w-8 h-8"
								/>
							</TableCell>
							<TableCell>{tenant.documents?.length}</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
};

export default TenantTable;
