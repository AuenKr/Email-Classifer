"use server"
import { authOption, session } from "@/lib/auth";
import { google } from "googleapis";
import { getServerSession } from "next-auth";
import { authorize } from "./gmailApi";


/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
export async function listLabels(auth: any) {
  const gmail = google.gmail({ version: "v1", auth });

  const res = await gmail.users.labels.list({
    userId: "me",
  });

  const labels = res.data.labels;
  if (!labels || labels.length === 0) {
    console.log("No labels found.");
    return;
  }
  return labels;
}

export async function getLabels() {
  const session: session | null = await getServerSession(authOption);
  if (!session)
    return;

  const auth = await authorize(session.user.email);
  if (!auth)
    return;
  const labels = await listLabels(auth);
  return {
    result: labels
  }
}