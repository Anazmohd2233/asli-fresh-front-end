"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiPhone, FiLock } from "react-icons/fi";
import { useRouter } from "next/navigation";

// Internal imports
import InputArea from "@components/form/InputArea";
import Error from "@components/form/Error";
import { Button } from "@components/ui/button";
import BottomNavigation from "@components/login/BottomNavigation";
import { useAuth } from "@hooks/azli_hooks/useCustomAuth";

export default function Login() {
  const router = useRouter();
  const {
    handleSendOtp,
    handleVerifyOtp,
    step,
    loading,
    isLoggedIn,
    otpKey,
    phone,
  } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ✅ Redirect user after successful login
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/user/dashboard");
    }
  }, [isLoggedIn, router]);

  // ✅ Handle form submit
  const onSubmit = async (data) => {
    if (step === "phone") {
      await handleSendOtp(data.phone);
    } else {
const ok = await handleVerifyOtp(data.otp);
    if (ok) {
      router.replace("/user/dashboard"); // use replace to avoid back button returning to OTP
    }    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white dark:bg-zinc-800 shadow-md rounded-lg mt-12 mb-12">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
        {step === "phone" ? "Login" : "Verify OTP"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Step 1: Phone Input */}
        {step === "phone" && (
          <div>
            <InputArea
              register={register}
              name="phone"
              label="Phone Number"
              type="text"
              placeholder="Enter phone number"
              Icon={FiPhone}
            />
            <Error errorMessage={errors.phone?.message} />
          </div>
        )}

        {/* Step 2: OTP Input */}
        {step === "otp" && (
          <div>
            <InputArea
              register={register}
              name="otp"
              label="OTP"
              type="text"
              placeholder="Enter OTP"
              Icon={FiLock}
            />
            <Error errorMessage={errors.otp?.message} />

            {/* Optional: show OTP key for debugging */}
            {/* {otpKey && (
              <p className="text-xs text-gray-500 mt-2 break-all">
                OTP Key (debug): <span className="font-mono">{otpKey}</span>
              </p>
            )} */}
          </div>
        )}

        {/* Submit Button */}
        <Button
          disabled={loading}
          isLoading={loading}
          type="submit"
          className="w-full mt-3"
        >
          {loading
            ? "Processing..."
            : step === "phone"
            ? "Send OTP"
            : "Verify OTP"}
        </Button>
      </form>

      {/* Info for user */}
      <div className="text-center text-sm text-gray-500 mt-4">
        {step === "otp"
          ? `OTP sent to ${phone || "your phone number"}.`
          : "Enter your phone number to receive an OTP."}
      </div>

        <BottomNavigation
                  or={true}
                  route={"/auth/signup"}
                  pageName={"Sign Up"}
                  loginTitle="Login"
                />
    </div>
  );
}
