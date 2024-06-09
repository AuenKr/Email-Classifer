import { EmailOption } from "@/components/EmailOption";
import Emails from "@/components/Emails";
import { authOption } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Email() {
  const session = await getServerSession(authOption);
  if (!session) redirect("/");
  return (
    <div>
      <div>
        <EmailOption />
        <Emails />
      </div>
    </div>
  );
}
