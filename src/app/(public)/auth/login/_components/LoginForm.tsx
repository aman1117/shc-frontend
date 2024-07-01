"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { submitLoginForm } from "@/server-actions/submit-otp.action";
import { useState } from "react";
import { sendOtp } from "@/server-actions/send-otp.action";
import { toast } from "sonner";

const LoginFormSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
  otp: z.string().length(6),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;

export default function LoginForm() {
  const [otpStatus, setOtpStatus] = useState<
    "pending" | "sending" | "sent" | "error"
  >("pending");
  const loginForm = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {},
  });

  const onLoginFormSubmit = async (data: LoginFormType) => {
    toast.promise(submitLoginForm(data), {
      loading: "Submitting OTP...",
      success: "Logged in successfully",
      error: "Something went wrong",
    });
  };

  const onClickSendOtpButton = async () => {
    if (
      (await loginForm.trigger("email")) &&
      (await loginForm.trigger("name"))
    ) {
      setOtpStatus("sending");
      toast.promise(
        sendOtp(loginForm.getValues("name"), loginForm.getValues("email")),
        {
          loading: "Sending OTP...",
          success: () => {
            setOtpStatus("sent");
            return "OTP sent successfully";
          },
          error: () => {
            setOtpStatus("error");
            return "Something went wrong";
          },
        },
      );
    }
  };
  return (
    <main className="w-screen h-screen">
      <Form {...loginForm}>
        <form
          onSubmit={loginForm.handleSubmit(onLoginFormSubmit)}
          className="space-y-8"
        >
          <FormField
            control={loginForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Ajay Sharma" {...field} />
                </FormControl>
                <FormDescription>
                  Please enter your name (3-255 characters).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@ajaysharma.dev" {...field} />
                </FormControl>
                <FormDescription>
                  We will send you an OTP to this email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {otpStatus === "sent" && (
            <>
              <FormField
                control={loginForm.control}
                name="otp"
                disabled={loginForm.formState.isLoading}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Otp</FormLabel>
                    <FormControl>
                      <Input placeholder="Six digits number" {...field} />
                    </FormControl>
                    <FormDescription>
                      Check your email for the OTP.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={loginForm.formState.isSubmitting} type="submit">
                Submit OTP
              </Button>
            </>
          )}
        </form>
      </Form>
      {otpStatus !== "sent" && (
        <Button
          disabled={otpStatus === "sending"}
          onClick={onClickSendOtpButton}
        >
          Send OTP
        </Button>
      )}
    </main>
  );
}
