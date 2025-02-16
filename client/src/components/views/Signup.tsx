import { useState } from "react";
import { signUp } from "../../queries/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const Signup = () => {
  const [signUpError, setSignUpError] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: { email: string; password: string }) => {
    setSignUpError("");
    const result = await signUp(values.email, values.password);

    if (result.success) {
      console.log("Sign up successful, user:", result.user);
    } else {
      console.error("Sign up failed:", result.error);
      setSignUpError(result.error || "");
    }
  };

  return (
    <div
      className={`flex flex-col justify-center max-w-sm mx-auto text-center mt-10 p-10 bg-gray-300`}
    >
      <h1>Welcome to the ToDo APP</h1>
      <br />
      <h3>Registation Page</h3>
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
          <Button type="submit">Sign Up</Button>
        </form>
      </Form>
      {signUpError && <p className="text-red-500 mt-2">{signUpError}</p>}
    </div>
  );
};

export default Signup;
