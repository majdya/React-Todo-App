import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email("Invalid email").min(5).max(50),
  password: z.string().min(6, "Password must be at least 6 characters").max(50),
});

type AuthFormProps = {
  onSubmit: (values: { email: string; password: string }) => void;
  buttonLabel: string;
  title: string;
  errorMessage?: string;
};

const AuthForm = ({
  onSubmit,
  buttonLabel,
  title,
  errorMessage,
}: AuthFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="flex flex-col justify-center max-w-sm mx-auto text-center mt-10 p-10 bg-gray-300">
      <h1>Welcome to the ToDo APP</h1>
      <br />
      <h3>{title}</h3>
      <br />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{buttonLabel}</Button>
        </form>
      </Form>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </div>
  );
};

export default AuthForm;
