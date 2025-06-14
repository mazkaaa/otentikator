import { useMemo } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";

interface PROPS {
	isOpen?: boolean;
	title?: string;
	description?: string;
	children?: React.ReactNode;
	onOpenChange?: (open: boolean) => void;
	footers?: React.ReactNode;
	showCloseButton?: boolean;
}
export const Modal = (props: PROPS) => {
	const {
		isOpen = false,
		children,
		description,
		title,
		onOpenChange,
		showCloseButton,
	} = props;

	const defineTitle = useMemo(() => {
		if (title) {
			return <DialogTitle>{title}</DialogTitle>;
		}
		return null;
	}, [title]);

	const defineDescription = useMemo(() => {
		if (description) {
			return <DialogDescription>{description}</DialogDescription>;
		}
		return null;
	}, [description]);

	const defineFooter = useMemo(() => {
		if (props.footers) {
			return <DialogFooter>{props.footers}</DialogFooter>;
		}
		return null;
	}, [props.footers]);

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent showCloseButton={showCloseButton}>
				<DialogHeader>
					{defineTitle}
					{defineDescription}
				</DialogHeader>
				{children}
				{defineFooter}
			</DialogContent>
		</Dialog>
	);
};
