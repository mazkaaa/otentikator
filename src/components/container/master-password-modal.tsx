import { hashData } from "@/utils/security";
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
  onClose: () => void;
  onSubmit: (encryptedPassword: string) => Promise<void>;
}
const formSchema = z.object({
  password: z.string().min(1, {
    message: "Password must not be empty",
  }),
});
const MasterPasswordModal = (props: PROPS) => {
  const { isOpen, onClose, onSubmit } = props;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  return (
    <Modal
      title="Master Password"
      isOpen={isOpen}
      description="Enter your master password to encrypt your data"
      onOpenChange={(open) => {
        if (!open && form.formState.isValid) {
          onClose();
        }
      }}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            onSubmit(hashData(data.password)).then(() => {
              form.reset();
              onClose();
            });
          })}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Master Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your master password..."
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button type="submit" variant="default">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default MasterPasswordModal;
