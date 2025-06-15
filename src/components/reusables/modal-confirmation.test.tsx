import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ModalConfirmation from "./modal-confirmation";
import "@testing-library/jest-dom/vitest";

describe("ModalConfirmation", () => {
	const defaultProps = {
		isOpen: true,
		title: "Confirmation",
		description: "Are you sure you want to proceed?",
		confirmButton: {
			text: "Confirm",
			onClick: vi.fn(),
		},
		cancelButton: {
			text: "Cancel",
			onClick: vi.fn(),
		},
	};

	it("renders with correct title and description", () => {
		render(<ModalConfirmation {...defaultProps} />);

		expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
		expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
	});

	it("renders confirm and cancel buttons with correct text", () => {
		render(<ModalConfirmation {...defaultProps} />);

		expect(
			screen.getByText(defaultProps.confirmButton.text),
		).toBeInTheDocument();
		expect(
			screen.getByText(defaultProps.cancelButton.text),
		).toBeInTheDocument();
	});

	it("calls confirmButton.onClick when confirm button is clicked", () => {
		render(<ModalConfirmation {...defaultProps} />);

		fireEvent.click(screen.getByText(defaultProps.confirmButton.text));

		expect(defaultProps.confirmButton.onClick).toHaveBeenCalledTimes(1);
	});

	it("calls cancelButton.onClick when cancel button is clicked", () => {
		render(<ModalConfirmation {...defaultProps} />);

		fireEvent.click(screen.getByText(defaultProps.cancelButton.text));

		expect(defaultProps.cancelButton.onClick).toHaveBeenCalledTimes(1);
	});

	it("does not throw error when button onClick handlers are not provided", () => {
		const propsWithoutHandlers = {
			...defaultProps,
			confirmButton: { text: "Confirm" },
			cancelButton: { text: "Cancel" },
		};

		render(<ModalConfirmation {...propsWithoutHandlers} />);

		expect(() => {
			fireEvent.click(screen.getByText("Confirm"));
			fireEvent.click(screen.getByText("Cancel"));
		}).not.toThrow();
	});

	it("calls onOpenChange when dialog state changes", () => {
		const onOpenChange = vi.fn();
		render(<ModalConfirmation {...defaultProps} onOpenChange={onOpenChange} />);

		fireEvent.click(screen.getByText(defaultProps.cancelButton.text));

		// This assumes the AlertDialog component calls onOpenChange
		// The actual implementation might depend on how AlertDialog is coded
		expect(onOpenChange).toHaveBeenCalled();
	});
});
