"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { FiUnlock, FiUser } from "react-icons/fi";
import dynamic from "next/dynamic";

//internal imports
import useUtilsFunction from "@hooks/useUtilsFunction";
import { getUserSession } from "@lib/auth-client";
import { useSelector } from "react-redux";

const LogoutButton = ({ storeCustomization }) => {
  const { showingTranslateValue } = useUtilsFunction();

    const {  isLoggedIn } = useSelector(
      (state) => state.auth
    );
  //   console.log("storeCustomization", storeCustomization);

  return (
    <>
      <Link
        href={`${
          isLoggedIn
            ? "/user/my-account"
            : "/auth/login"
        }`}
        className="font-medium hover:text-emerald-600"
      >
        My Account{" "}
      </Link>
      <span className="mx-2">|</span>
      {isLoggedIn ? (
        <button
          onClick={() => signOut()}
          type="submit"
          className="flex items-center font-medium hover:text-emerald-600"
        >
          <span className="mr-1">
            <FiUnlock />
          </span>
          Logout{" "}
        </button>
      ) : (
        <Link
          href="/auth/login"
          className="flex items-center font-medium hover:text-emerald-600"
        >
          <span className="mr-1">
            <FiUser />
          </span>
          Login{" "}
        </Link>
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(LogoutButton), { ssr: false });
