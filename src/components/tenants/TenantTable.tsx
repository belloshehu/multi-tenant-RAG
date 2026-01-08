import React from "react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { formatDate } from "../../lib/timedate";
import { ITenantType } from "../../types/tenants.types";

interface ItenantTableProps {
	data: ITenantType[];
}
const TenantTable = ({ data }: ItenantTableProps) => {
	if (!data || data.length === 0) return <Badge>No tenants</Badge>;
	return (
		<Table>
			<TableCaption>A list of tenants.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">Name</TableHead>
					<TableHead>Created At</TableHead>
					<TableHead>Active</TableHead>
					<TableHead>Verified</TableHead>
					<TableHead>Website</TableHead>
					<TableHead>Logo</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((tenant) => {
					return (
						<TableRow>
							<TableCell className="font-medium">{tenant.name}</TableCell>
							<TableCell>{formatDate(tenant.created_at!)}</TableCell>
							<TableCell>{tenant.active ? "Yes" : "No"}</TableCell>
							<TableCell>{tenant.active ? "Yes" : "No"}</TableCell>
							<TableCell>{tenant.site_url}</TableCell>
							<TableCell content="">{tenant.logo}</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
};

export default TenantTable;
