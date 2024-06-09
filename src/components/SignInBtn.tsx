"use client";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import Image from "next/image";

export function SignInBtn() {
  return (
    <Button onClick={async () => await signIn("google")} className="flex justify-between w-full text-md">
      <Image src="google_logo.svg" alt="google" width={40} height={45} />
      Continue with Google
    </Button>
  );
}
