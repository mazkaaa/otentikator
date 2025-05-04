"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Modal } from "../reusables";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

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

const ManualFormModal = (props: PROPS) => {
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
      description="Fill in the form to add a new OTP"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            props.submitForm(data);
            onModalClose();
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

export default ManualFormModal;
