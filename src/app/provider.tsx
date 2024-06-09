"use client";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        <RecoilRoot>{children}</RecoilRoot>
      </SessionProvider>
    </ThemeProvider>
  );
}
