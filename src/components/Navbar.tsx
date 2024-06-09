"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { ModeToggle } from "./toggler";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Image from "next/image";
import { UserRound } from "lucide-react";

export function Navbar() {
  const { data } = useSession();
  return (
    <div className="flex justify-between items-center p-3">
      {data && (
        <div className="flex space-x-4 grow-0">
          <Avatar>
            <Image
              src={data.user?.image || "/temp.svg"}
              alt="User Account"
              width={40}
              height={40}
            />
            <AvatarFallback>
              <UserRound />
            </AvatarFallback>
          </Avatar>
          <div>
            <div>{data.user?.name}</div>
            <div>{data.user?.email}</div>
          </div>
        </div>
      )}
      <div className="space-x-3 grow flex justify-end">
        {data ? (
          <Button onClick={async () => await signOut()}>Sign Out</Button>
        ) : (
          <Button onClick={async () => await signIn("google")}>Sign In</Button>
        )}
        <ModeToggle />
      </div>
    </div>
  );
}
