import { render, screen } from "@testing-library/react";
import TenantList from "../TenantList";
import { ITenantType } from "@/src/types/tenants.types";
import { TenantProvider } from "@/src/contexts/tenant-context";

const mockTenantList: ITenantType[] = [
	{
		id: 0,
		active: false,
		name: "Aljamay",
		description: "Spices maker",
		email: "aljamay@gmail.com",
		logo: "https://image/photo/logo.png",
		site_url: "https://aljamay.com",
		support_email: "aljamay@gmail.com",
		user_id: "0",
		verified: true,
	},
	{
		id: 1,
		active: false,
		name: "Sightek",
		description: "Tech gurus",
		email: "sightek@gmail.com",
		logo: "https://image/photo/sightek-logo.png",
		site_url: "https://sightek.com",
		support_email: "sightek@gmail.com",
		user_id: "1",
		verified: true,
	},
];

describe("TenantList", () => {
	it("should render list of tenant with the correct number of items ", () => {
		render(
			<TenantProvider>
				<TenantList data={mockTenantList} loading={false} />
			</TenantProvider>
		);
		const tenantListItems = screen.getByRole("list").childNodes;
		expect(tenantListItems.length).toEqual(2);
	});

	it("should render 'Loading tenants' when loading props has value of true ", () => {
		render(
			<TenantProvider>
				<TenantList data={mockTenantList} loading={true} />
			</TenantProvider>
		);
		const loadingText = screen.getByText("Loading tenants");
		expect(loadingText).toBeInTheDocument;
	});

	it("should render 'Empty tenants' when list is empty and loading is false", () => {
		render(
			<TenantProvider>
				<TenantList data={[]} loading={false} />
			</TenantProvider>
		);
		const emptyText = screen.getByText("Empty tenants");
		expect(emptyText).toBeInTheDocument;
	});

	it("should render 'Empty tenants' when list data is null and loading is false", () => {
		render(
			<TenantProvider>
				<TenantList data={null} loading={false} />
			</TenantProvider>
		);
		const emptyText = screen.getByText("Empty tenants");
		expect(emptyText).toBeInTheDocument;
	});
});
