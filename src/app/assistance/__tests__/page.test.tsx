import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import AIAssistancePage from "../page";

const mockToggle = jest.fn((state) => !state);

describe("AIAssistance", () => {
	describe("Render", () => {
		it("renders heading with text 'AI Assistance' ", () => {
			render(<AIAssistancePage />);
			expect(screen.getByText("AI Assistance")).toBeInTheDocument;
		});

		it("renders button with text 'Chat with Ragy' ", () => {
			render(<AIAssistancePage />);
			const button = screen.getByTestId("toggle-btn");
			expect(button).toBeInTheDocument;
			expect(button.innerHTML).toContain("Chat with Ragly");
		});

		it("render show section with a button, textarea and send button", () => {
			render(<AIAssistancePage />);
			const button = screen.getByTestId("toggle-btn");
			expect(button).toBeInTheDocument;
			const chatSection = screen.getByTestId("chat-section");
			expect(chatSection).toBeInTheDocument;
			expect(screen.getByPlaceholderText(/Ask a question/i)).toBeInTheDocument;
			expect(screen.getByTestId("send-btn")).toBeInTheDocument;
		});
	});

	describe("Behavior", () => {
		// beforeEach(() => {
		// 	// Clear textarea
		// 	render(<AIAssistancePage />);
		// 	const textarea = screen.getByPlaceholderText(/Ask a question/i);
		// 	fireEvent.input(textarea, { target: { value: "" } });
		// });

		it("should call toggle button onclick handler", () => {
			render(<AIAssistancePage />);
			const button = screen.getByTestId("toggle-btn");
			expect(button).toBeInTheDocument;
			button.onclick = mockToggle;
			fireEvent.click(button);
			expect(mockToggle).toHaveBeenCalledTimes(1);
		});

		it("should change value of textarea when typing and enable send button", () => {
			render(<AIAssistancePage />);
			const textarea = screen.getByPlaceholderText(/Ask a question/i);
			expect(textarea).toBeInTheDocument;
			fireEvent.input(textarea, { target: { value: "Hello ragly" } });
			expect(textarea).toHaveDisplayValue("Hello ragly");
			const button = screen.getByTestId("send-btn");
			expect(button).toBeInTheDocument;
			expect(button).toBeEnabled();
			fireEvent.input(textarea, { target: { value: "" } });
			expect(textarea).toHaveDisplayValue("");
		});

		it("should disable send button when no text is entered", () => {
			render(<AIAssistancePage />);
			const button = screen.getByTestId("send-btn");
			expect(button).toBeInTheDocument;
			expect(button).toBeDisabled();
		});
	});
});
