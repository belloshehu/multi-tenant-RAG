import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import TenantDetailPage from "../page";

describe("Tenant detail page", () => {
	it("renders heading with text 'Tenant Detail'", () => {
		render(<TenantDetailPage />);
		const heading = screen.getByRole("heading", { level: 3 });
		expect(heading).toBeInTheDocument();
		expect(heading).toHaveTextContent("Tenant Detail");
	});
});
