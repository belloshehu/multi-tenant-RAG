import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import PricingPage from "@/src/app/pricing/page";

describe("Pricing Page", () => {
	it("renders a heading with text 'Pricing' ", () => {
		render(<PricingPage />);
		const heading = screen.getByRole("heading", { level: 1 });
		expect(heading).toBeInTheDocument();
		expect(heading).toHaveTextContent("Pricing");
	});

	it("renders heading with a wrong text 'Price'", () => {
		render(<PricingPage />);
		const heading = screen.getByRole("heading", { level: 1 });
		expect(heading).not.toHaveTextContent("Price");
	});
});
