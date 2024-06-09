"use client";
import { useEffect, useState } from "react";
import { EmailCard } from "./EmailCard";
import { EmailCardSkeleton } from "./EmailCardSkeleton";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { noEmailAtom } from "@/store/atom/noEmailAtom";
import { currEmailsAtom } from "@/store/atom/currEmailsAtom";
import { useToast } from "./ui/use-toast";

export default function Emails() {
  const [currEmails, setCurrEmails] = useRecoilState(currEmailsAtom);
  const noEmail = useRecoilValue(noEmailAtom);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      setLoading(true);
      axios.get(`/api/email/?noEmail=${noEmail}`).then(async (response) => {
        const data = await response.data;
        setCurrEmails(data.email);
        setLoading(false);
      });
    } catch (error) {
      toast({
        title: "Internal Server Error",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noEmail]);

  if (loading) return [1, 2, 3, 4, 5].map((val, index) => <EmailCardSkeleton key={index} />);
  return (
    <>
      {loading ? null : (
        <div className="flex items-center justify-center">
          <div className="w-full">
            {currEmails.map((email) => (
              <EmailCard key={email.id} messageId={email.id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export interface EmailType {
  id: string;
  label: string | null;
}

export interface EmailDescType {
  id: string;
  snippet: string;
  Date: string;
  From: string;
  Subject: string;
  body: string;
}
