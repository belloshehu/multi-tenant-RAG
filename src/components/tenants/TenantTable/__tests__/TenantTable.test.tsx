import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import TenantTable from "../TenantTable";
import { ITenantType } from "@/src/types/tenants.types";

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
		documents: [],
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
		documents: [],
	},
];

describe("TenantTable", () => {
	describe("Render", () => {
		it('should render "No tenants" when data is null', () => {
			render(<TenantTable data={null} />);
			expect(screen.getByText("No tenants")).toBeInTheDocument();
		});

		it('should render "No tenants" when data is an empty list', () => {
			render(<TenantTable data={[]} />);
			expect(screen.getByText("No tenants")).toBeInTheDocument();
		});

		it("should render tenant table header with correct heading", () => {
			render(<TenantTable data={mockTenantList} />);
			expect(screen.getByText("A list of tenants.")).toBeInTheDocument();
			expect(screen.getByText("Name")).toBeInTheDocument();
			expect(screen.getByText("Created At")).toBeInTheDocument();
			expect(screen.getByText("Verified")).toBeInTheDocument();
			expect(screen.getByText("Website")).toBeInTheDocument();
			expect(screen.getByText("Logo")).toBeInTheDocument();
			expect(screen.getByText("Documents")).toBeInTheDocument();
		});

		it("should render tenant table body with correct number of rows.", () => {
			render(<TenantTable data={mockTenantList} />);
			const rows = screen.getByTestId("table-body").childNodes;
			expect(rows.length).toEqual(2);
		});

		it("Should render rows with double number of links", () => {
			render(<TenantTable data={mockTenantList} />);
			const rows = screen.getByTestId("table-body").childNodes;
			const link = screen.getAllByRole("link");
			expect(rows.length * 2).toEqual(link.length);
		});

		it("Should render link with correct href and display text ", () => {
			render(<TenantTable data={mockTenantList} />);
			const link = screen.getAllByRole("link")[0];
			expect(link.getAttribute("href")).toEqual(
				"/dashboard/tenants/" + mockTenantList[0].id
			);
			expect(link.innerHTML).toEqual(mockTenantList[0].name);
		});
	});

	describe("Behavior", () => {
		it("Should press the name link when clicked", () => {
			render(<TenantTable data={mockTenantList} />);
			const link = screen.getAllByRole("link")[0];
			fireEvent.click(link);
			expect(link).toHaveAttribute("aria-pressed", "true");
		});

		it("Should press the website link when clicked", () => {
			render(<TenantTable data={mockTenantList} />);
			const link = screen.getAllByRole("link")[1];
			fireEvent.click(link);
			expect(link).toHaveAttribute("aria-pressed", "true");
		});
	});
});
