"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiPhone, FiMail, FiUser, FiLock } from "react-icons/fi";
import { useRouter } from "next/navigation";
import InputArea from "@components/form/InputArea";
import Error from "@components/form/Error";
import { Button } from "@components/ui/button";
import BottomNavigation from "@components/login/BottomNavigation";
import { useAuth } from "@hooks/azli_hooks/useCustomAuth";

export default function SignUp() {
  const router = useRouter();
  const { handleRegister, handleVerifyOtp, step, loading, isLoggedIn, phone } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    if (isLoggedIn) router.push("/user/dashboard");
  }, [isLoggedIn, router]);

  const onSubmit = async (data) => {
    if (step === "phone") {
      await handleRegister(data); // ✅ use register API here
    } else {
      const ok = await handleVerifyOtp(data.otp);
      if (ok) router.replace("/user/dashboard");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white dark:bg-zinc-800 shadow-md rounded-lg mt-12 mb-12">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
        {step === "phone" ? "Create Account" : "Verify OTP"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {step === "phone" && (
          <>
            <InputArea register={register} name="firstName" label="First Name" placeholder="Enter first name" Icon={FiUser} />
            <Error errorMessage={errors.firstName?.message} />

            <InputArea register={register} name="lastName" label="Last Name" placeholder="Enter last name" Icon={FiUser} />
            <Error errorMessage={errors.lastName?.message} />

            <InputArea register={register} name="email" label="Email" type="email" placeholder="Enter email address" Icon={FiMail} />
            <Error errorMessage={errors.email?.message} />

            <InputArea register={register} name="phone" label="Phone Number" placeholder="Enter phone number" Icon={FiPhone} />
            <Error errorMessage={errors.phone?.message} />
          </>
        )}

        {step === "otp" && (
          <div>
            <InputArea register={register} name="otp" label="OTP" type="text" placeholder="Enter OTP" Icon={FiLock} />
            <Error errorMessage={errors.otp?.message} />
          </div>
        )}

        <Button disabled={loading} isLoading={loading} type="submit" className="w-full mt-3">
          {loading ? "Processing..." : step === "phone" ? "Register & Send OTP" : "Verify OTP"}
        </Button>
      </form>

      <div className="text-center text-sm text-gray-500 mt-4">
        {step === "otp"
          ? `OTP sent to ${phone || "your phone number"}.`
          : "Fill your details and register with OTP verification."}
      </div>

      <BottomNavigation or route="/auth/login" pageName="Login" loginTitle="Sign Up" />
    </div>
  );
}
