import { render, screen } from "@testing-library/react";
import DocumentationPage from "../page";

describe("Docs Page", () => {
	it('renders heading text "Documentations"', () => {
		render(<DocumentationPage />);
		expect(screen.getByText("Documentations")).toBeInTheDocument;
		expect(screen.getAllByText(/Create account/i)).toBeInTheDocument;
		expect(screen.getAllByText(/Add tenants/i)).toBeInTheDocument;
		expect(screen.getAllByText(/Add documents/i)).toBeInTheDocument;
		expect(screen.getAllByText(/Index documents/i)).toBeInTheDocument;
		expect(screen.getAllByText(/Activate document/i)).toBeInTheDocument;
	});
});
