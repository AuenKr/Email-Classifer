"use client";
import axios from "axios";
import { EmailDetailSheet } from "./EmailDetailSheet";
import { EmailCardSkeleton } from "./EmailCardSkeleton";
import { useEffect, useMemo, useState } from "react";
import { EmailDescType } from "./Emails";
import { useRecoilValue } from "recoil";
import { currEmailsAtom } from "@/store/atom/currEmailsAtom";

export function EmailCard({ messageId }: { messageId: string }) {
  const [emailDetail, setEmailDetail] = useState<EmailDescType | null>(null);
  const [loading, setLoading] = useState(true);
  const currEmails = useRecoilValue(currEmailsAtom);

  useEffect(() => {
    axios.get(`/api/email/${messageId}`).then(async (response) => {
      const data = await response.data;
      setEmailDetail(data.email);
      setLoading(false);
    });
  }, [messageId]);

  const currLabel = useMemo(() => {
    const email = currEmails.filter((email) => email.id === messageId)[0];
    return email.label;
  }, [currEmails, messageId]);

  if (loading) return <EmailCardSkeleton />;
  return (
    <div>
      {emailDetail && (
        <EmailDetailSheet key={emailDetail.id} name={emailDetail.From} subject={emailDetail.Subject} body={emailDetail.body} label={currLabel || ""}>
          <div className="flex gap-4 border border-gray-200 rounded-lg p-4 dark:border-gray-800 m-3 hover:cursor-pointer">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <div className="font-medium hover:underline underline-offset-4">{emailDetail.From}</div>
                <div className=" text-gray-500 dark:text-gray-400 text-right">
                  <div className="dark:text-white">{currLabel}</div>
                  <div className="text-xs">{emailDetail.Date}</div>
                </div>
              </div>
              <div className="text-md text-gray-500 dark:text-gray-400 text-clip truncate line-clamp-2 text-wrap">{emailDetail.snippet}</div>
            </div>
          </div>
        </EmailDetailSheet>
      )}
    </div>
  );
}
