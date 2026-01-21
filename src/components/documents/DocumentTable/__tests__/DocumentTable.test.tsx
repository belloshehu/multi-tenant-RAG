import { render, screen, fireEvent } from "@testing-library/react";
import DocumentTable from "../DocumentTable";
import { IDocumentType } from "@/src/types/documents.types";

const mockDocumentList: IDocumentType[] = [
	{
		id: 0,
		name: "handbook.pdf",
		fileUrl: "https://storage/handbook.pdf",
		tenant_id: 0,
	},
	{
		id: 1,
		name: "support.pdf",
		fileUrl: "https://storage/support.pdf",
		tenant_id: 1,
	},
];

describe("DocumentTable", () => {
	describe("Render", () => {
		it('should render "No Documents" when data is null', () => {
			render(<DocumentTable data={null} />);
			expect(screen.getByText("No documents")).toBeInTheDocument;
		});

		it('should render "No Documents" when data is an empty list', () => {
			render(<DocumentTable data={[]} />);
			expect(screen.getByText("No Documents")).toBeInTheDocument;
		});

		it("should render document table header with correct heading", () => {
			render(<DocumentTable data={mockDocumentList} />);
			expect(screen.getByText("A list of documents.")).toBeInTheDocument;
			expect(screen.getByText("Name")).toBeInTheDocument;
			expect(screen.getByText("Created At")).toBeInTheDocument;
			expect(screen.getByText("File")).toBeInTheDocument;
			expect(screen.getByText("Indexing")).toBeInTheDocument;
			expect(screen.getByText("Status")).toBeInTheDocument;
			expect(screen.getByText("Description")).toBeInTheDocument;
			expect(screen.getByText("Actions")).toBeInTheDocument;
		});

		it("should render document table body with correct number of rows.", () => {
			render(<DocumentTable data={mockDocumentList} />);
			const rows = screen.getByTestId("table-body").childNodes;
			expect(rows.length).toEqual(2);
		});

		it("Should render rows with double number of links", () => {
			render(<DocumentTable data={mockDocumentList} />);
			const rows = screen.getByTestId("table-body").childNodes;
			const link = screen.getAllByRole("link");
			expect(rows.length).toEqual(link.length);
		});
	});

	describe("Behavior", () => {
		it("Should press the file link when clicked", () => {
			render(<DocumentTable data={mockDocumentList} />);
			const link = screen.getAllByRole("link")[1];
			fireEvent.click(link);
			expect(link).toBePressed;
		});
	});
});
