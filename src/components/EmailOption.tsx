"use client";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "./ui/button";
import { useRecoilState, useSetRecoilState } from "recoil";
import { noEmailAtom } from "@/store/atom/noEmailAtom";
import { currEmailsAtom } from "@/store/atom/currEmailsAtom";
import axios from "axios";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { Loader2 } from "lucide-react";

export function EmailOption() {
  const setNoEmail = useSetRecoilState(noEmailAtom);
  const [currEmails, setCurrEmails] = useRecoilState(currEmailsAtom);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const classifyBtnHandler = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/classify",
        {
          emails: currEmails,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      setCurrEmails(data.emails);
    } catch (error) {
      console.error(error);
      toast({
        title: "Internal Server error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-between items-center gap-4 m-4">
      <Select
        onValueChange={(e) => {
          setNoEmail(parseInt(e));
        }}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Recent Emails" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>No Of Recent Emails</SelectLabel>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="15">15</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button variant="outline" size="lg" className="w-[140px]" onClick={classifyBtnHandler}>
        {loading ? <Loader2 className="animate-spin" /> : "Classify Email"}
      </Button>
    </div>
  );
}
