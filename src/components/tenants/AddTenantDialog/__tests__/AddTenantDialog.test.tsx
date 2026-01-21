import { render, screen } from "@testing-library/react";
import AddTenantDialog from "../AddTenantDialog";
import * as process from "process";

const originalEnv = process.env;

beforeAll(() => {
	process.env.API_BASE_URL_TEST = "https://example.com/api.test";
});

afterEach(() => {
	process.env.API_BASE_URL_TEST = originalEnv.API_BASE_URL_TEST;
});

describe("AddTenantDialog", () => {
	describe("Render", () => {
		it("should render trigger button with text 'Add tenant' and svg icon ");
		render(<AddTenantDialog buttonText="Add tenant" />);
		const svgIcon = screen.getByTestId("trigger-svg");
		expect(svgIcon).toBeInTheDocument();
	});
	describe("Behavior", () => {});
});
