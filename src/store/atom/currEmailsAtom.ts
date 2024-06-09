import { EmailType } from "@/components/Emails";
import { atom } from "recoil";

export const currEmailsAtom = atom<EmailType[]>({
  key: "currEmailsAtom",
  default: [],
});
