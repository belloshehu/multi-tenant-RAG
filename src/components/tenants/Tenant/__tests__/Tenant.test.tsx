import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Tenant from "../Tenant";
import { ITenantType } from "@/src/types/tenants.types";
import { TenantProvider } from "@/src/contexts/tenant-context";

const mockTenant: ITenantType = {
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
};

const mockclickHandler = jest.fn(() => {
	return mockTenant;
});

describe("Tenant Card", () => {
	describe("Render", () => {
		it("renders tenant with correct data'", () => {
			render(
				<TenantProvider>
					<Tenant data={mockTenant} />
				</TenantProvider>
			);
			const card = screen.getByTestId("tenant-card");
			expect(card).toBeInTheDocument();
			const logo = screen.getByRole("img");
			expect(logo).toBeInTheDocument();
		});
	});

	describe("Behavior", () => {
		it("should throw an error when useTenant is used outside TenantProvider", () => {
			expect(() => render(<Tenant data={mockTenant} />)).toThrow(
				"useTenant hook must be used inside TenantProvider"
			);
		});

		it("it should call the tenant card click handler when clicked", () => {
			render(
				<TenantProvider>
					<Tenant data={mockTenant} />
				</TenantProvider>
			);
			const card = screen.getByTestId("tenant-card");
			card.onclick = mockclickHandler;
			// call userEvent with click event
			fireEvent.click(card);
			// assert whether the card was clicked
			expect(mockclickHandler).toHaveBeenCalledTimes(1);
		});

		it("it should set the selected tenant when tenant is clicked", () => {
			render(
				<TenantProvider>
					<Tenant data={mockTenant} />
				</TenantProvider>
			);
			const card = screen.getByTestId("tenant-card");
			card.onclick = mockclickHandler;
			// call userEvent with click event
			fireEvent.click(card);
			expect(mockclickHandler).toHaveReturnedWith(mockTenant);
		});
	});
});
