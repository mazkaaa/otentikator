"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Modal } from "../reusables";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "../ui";
import { toast } from "sonner";

interface PROPS {
  isOpen: boolean;
  onModalClose: () => void;
  submitForm: (data: z.infer<typeof formSchema>) => void;
}
const formSchema = z.object({
  label: z.string().min(1, {
    message: "Label must not be empty",
  }),
  issuer: z.string().min(1, {
    message: "Issuer must not be empty",
  }),
  secret: z.string().min(1, {
    message: "Secret must not be empty",
  }),
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
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            props.submitForm(data);
            onModalClose();
            toast.success("Key added successfully");
            form.reset();
          })}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input placeholder="Example: John Doe" {...field} />
                </FormControl>
                <FormDescription>The label for the OTP key</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="issuer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Issuer</FormLabel>
                <FormControl>
                  <Input placeholder="Example: Google" {...field} />
                </FormControl>
                <FormDescription>The issuer for the OTP key</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="secret"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Secret</FormLabel>
                <FormControl>
                  <Input placeholder="Example: 4CUAUJAEFJ72wXL" {...field} />
                </FormControl>
                <FormDescription>The secret for the OTP key</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button type="button" variant="secondary" onClick={onModalClose}>
              Cancel
            </Button>
            <Button type="submit" variant="default">
              Save
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
