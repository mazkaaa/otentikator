import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../ui/button";
import { Modal } from "./modal";
import "@testing-library/jest-dom/vitest";

describe("Modal", () => {
	it("renders correctly when closed", () => {
		render(<Modal title="Test Title" description="Test Description" />);
		expect(screen.queryByText("Test Title")).not.toBeInTheDocument();
	});

	it("renders correctly when open", () => {
		render(
			<Modal isOpen title="Test Title" description="Test Description">
				<div>Test Content</div>
			</Modal>,
		);

		expect(screen.getByText("Test Title")).toBeInTheDocument();
		expect(screen.getByText("Test Description")).toBeInTheDocument();
		expect(screen.getByText("Test Content")).toBeInTheDocument();
	});

	it("does not render title when not provided", () => {
		render(<Modal isOpen description="Test Description" />);
		expect(document.querySelector("h2")).not.toBeInTheDocument();
	});

	it("does not render description when not provided", () => {
		render(<Modal isOpen title="Test Title" />);
		expect(screen.getByText("Test Title")).toBeInTheDocument();
		expect(document.querySelector("p")).not.toBeInTheDocument();
	});

	it("renders footer when provided", () => {
		render(
			<Modal
				isOpen
				title="Test Title"
				footers={<Button>Test Footer</Button>}
				description="Test Description"
			/>,
		);
		expect(screen.getByText("Test Footer")).toBeInTheDocument();
	});

	it("calls onOpenChange when dialog is closed", async () => {
		const user = userEvent.setup();
		const onOpenChange = vi.fn();

		render(
			<Modal
				isOpen
				title="Test Title"
				onOpenChange={onOpenChange}
				showCloseButton={true}
				description="Test Description"
			/>,
		);

		const closeButton = document.querySelector('[data-slot="dialog-close"]');
		expect(closeButton).toBeInTheDocument();
		await user.click(closeButton as HTMLElement);

		expect(onOpenChange).toHaveBeenCalledWith(false);
	});
});
