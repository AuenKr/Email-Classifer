"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { saveApiKey } from "@/actions/apiKey";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";

export function OpenApiKey() {
  const [apiKey, setApiKey] = useState("");
  const [validKey, setValidKey] = useState(true);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  return (
    <div>
      <div className="space-y-2 m-2">
        <Label htmlFor="apiKey">Enter Your Open API key</Label>
        <Input
          className="focus:ring-2 active:ring-2 ring-blue-600 border-slate-400 dark:bg-slate-700"
          name="apiKey"
          onChange={(e) => {
            setApiKey(e.target.value);
          }}
        />
        {!validKey && <div className="text-red-500">Enter Valid Open Api key</div>}
      </div>
      <div>
        <Button
          className="w-[90px]"
          onClick={async () => {
            if (apiKey.length < 5) {
              setValidKey(false);
              return;
            }
            setValidKey(true);
            try {
              setLoading(true);
              const res: any = await saveApiKey(apiKey);
              if (res?.error) throw new Error("Failed");
              router.push("/email");
            } catch (error) {
              console.error(error);
              toast({
                title: "Invalid Api Key",
                description: "Please use valid api key",
              });
            } finally {
              setLoading(false);
            }
          }}
        >
          {loading ? <Loader2 className="animate-spin" /> : "Submit"}
        </Button>
      </div>
    </div>
  );
}
