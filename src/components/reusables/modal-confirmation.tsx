import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "../ui/alert-dialog";

interface IModalConfirmationProps {
	isOpen: boolean;
	onOpenChange?: (open: boolean) => void;
	title: string;
	description: string;
	confirmButton: {
		text: string;
		onClick?: () => void;
	};
	cancelButton: {
		text: string;
		onClick?: () => void;
	};
}
const ModalConfirmation = ({
	cancelButton,
	confirmButton,
	description,
	isOpen,
	onOpenChange,
	title,
}: IModalConfirmationProps) => {
	return (
		<AlertDialog open={isOpen} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel
						onClick={() => {
							if (cancelButton.onClick) {
								cancelButton.onClick();
							}
						}}
					>
						{cancelButton.text}
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={() => {
							if (confirmButton.onClick) {
								confirmButton.onClick();
							}
						}}
					>
						{confirmButton.text}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default ModalConfirmation;
