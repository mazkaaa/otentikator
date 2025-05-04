import { useMemo } from "react";
import { Button } from "../ui/button";
import { Modal } from "./modal";

interface PROPS {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmButton: {
    text: string;
    onClick: () => void;
  };
  cancelButton: {
    text: string;
    onClick: () => void;
  };
}
export const ModalConfirmation = (props: PROPS) => {
  const { isOpen, onOpenChange } = props;

  const defineFooter = useMemo(() => {
    return (
      <>
        <Button onClick={props.cancelButton.onClick} variant="secondary">
          {props.cancelButton.text}
        </Button>
        <Button onClick={props.confirmButton.onClick} variant="default">
          {props.confirmButton.text}
        </Button>
      </>
    );
  }, [
    props.cancelButton.onClick,
    props.cancelButton.text,
    props.confirmButton.onClick,
    props.confirmButton.text,
  ]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={props.title}
      description={props.description}
      footers={defineFooter}
    />
  );
};
