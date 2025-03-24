"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Modal } from "../reusables";
import { zodResolver } from "@hookform/resolvers/zod";

interface PROPS {
  isOpen: boolean;
  onModalClose: () => void;
}
const formSchema = z.object({
  label: z.string(),
  issuer: z.string(),
  secret: z.string(),
});

export const ManualFormModal = (props: PROPS) => {
  const { isOpen, onModalClose } = props;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: "",
      issuer: "",
      secret: "",
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      title="Manual Form"
      onOpenChange={(open) => {
        if (!open) {
          onModalClose();
        }
      }}
    />
  );
};
