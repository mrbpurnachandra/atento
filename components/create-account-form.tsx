"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { createAccount } from "@/app/auth/account/actions";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle, MoveRight } from "lucide-react";

const createAccountFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, {
      message: "Name should be minimum 2 characters long.",
    })
    .max(32, {
      message: "Name should be maximum 32 characters long.",
    }),
});

export default function CreateAccountForm({ name }: { name?: string | null }) {
  const form = useForm<z.infer<typeof createAccountFormSchema>>({
    resolver: zodResolver(createAccountFormSchema),
    defaultValues: {
      name: name || "",
    },
  });

  const [error, setError] = useState<string | null>(null);

  async function onSubmit(values: z.infer<typeof createAccountFormSchema>) {
    const response = await createAccount(values);

    // If the create account is successful then void is returned and redirect is perfomed
    // Otherwise error has occured
    if (response) setError(response.error);
  }

  return (
    <Form {...form} handleSubmit={form.handleSubmit}>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form
        method="post"
        className="flex items-end space-x-2 justify-center"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormMessage className="absolute -mt-4" />
              <FormLabel className="sr-only">Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isLoading}>
          <MoveRight />
        </Button>
      </form>
    </Form>
  );
}
