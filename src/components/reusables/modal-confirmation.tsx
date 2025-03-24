import React, { useMemo } from "react";
import { Modal } from "./modal";
import { Button } from "../ui";

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
