"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Wrapper } from "@/components/shared/Wrapper";
import Navbar from "@/components/shared/Navbar";
import { db } from "@vercel/postgres";
import { useState } from "react";
import { login, signup } from "../lib/actions";

const FormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username is required.",
    })
    .trim(),
  password: z
    .string()
    .min(2, {
      message: "Password is required.",
    })
    .trim(),
});

export default function InputForm() {
  const [isSignup, setIsSignup] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (isSignup) {
      console.log("signing up")
      signup(data);
      return;
    }
    login(data);
  }

  return (
    <>
      <Navbar />
      <Wrapper>
        <h1 className="text-center text-2xl">
          {isSignup ? <span>Daftar Baru</span> : <span>Masuk</span>}{" "}
          ke Antriya
        </h1>
        <p className="text-center text-xs">
          {isSignup ? <span>Sudah</span> : <span>Belum</span>} punya
          akun?{" "}
          <span
            className="underline cursor-pointer"
            onClick={() => setIsSignup((prev) => !prev)}
          >
            {isSignup ? <span>Masuk</span> : <span>Daftar Baru</span>}
          </span>
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="md:w-2/3 m-auto space-y-6"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              {isSignup ? <span>Daftar</span> : <span>Masuk</span>}
            </Button>
          </form>
        </Form>
      </Wrapper>
    </>
  );
}
