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
import Logo from "@/components/ui/logo";

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
        }
      );
    }
  };

  return (
    <main className="flex-col  w-screen h-screen flex items-center justify-center bg-gray-100">
      <Form {...loginForm}>
        <form
          onSubmit={loginForm.handleSubmit(onLoginFormSubmit)}
          className="space-y-8 bg-white p-8 rounded-lg shadow-md w-96"
        >
          <div className="mx-auto flex items-center justify-center">
            <Logo w={100} h={100} />
          </div>
          <FormField
            control={loginForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Aman Sharma"
                    {...field}
                    className="border-green-600 focus:ring-green-600 focus:border-green-600"
                  />
                </FormControl>
                <FormDescription className="text-sm text-gray-500">
                  Please enter your name
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
                <FormLabel className="text-base font-semibold">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@gmail.com"
                    {...field}
                    className="border-green-600 focus:ring-green-600 focus:border-green-600"
                  />
                </FormControl>
                <FormDescription className="text-sm text-gray-500"></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {otpStatus !== "sent" && (
            <Button
              disabled={otpStatus === "sending"}
              onClick={onClickSendOtpButton}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold  px-4 rounded"
            >
              Send OTP
            </Button>
          )}

          {otpStatus === "sent" && (
            <>
              <FormField
                control={loginForm.control}
                name="otp"
                disabled={loginForm.formState.isLoading}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">
                      OTP
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Six digits number"
                        {...field}
                        className="border-green-600 focus:ring-green-600 focus:border-green-600"
                      />
                    </FormControl>
                    <FormDescription className="text-sm text-gray-500">
                      Check your email for the OTP.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={loginForm.formState.isSubmitting}
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
              >
                Submit OTP
              </Button>
            </>
          )}
        </form>
      </Form>
    </main>
  );
}
