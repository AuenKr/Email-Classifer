import { authOption, session } from "@/lib/auth";
import { google } from "googleapis";
import { getServerSession } from "next-auth";
import { authorize } from "./gmailApi";
import { headers } from "next/headers";

async function listMessages(auth: any, n: number = 5) {
  try {
    const gmail = google.gmail({ version: "v1", auth });

    const result = await gmail.users.messages.list({
      userId: "me",
      maxResults: n,
    });

    if (!result.data) return null;

    const messages = result.data.messages;
    if (!messages || messages.length === 0) {
      return;
    }

    return {
      messages,
    };
  } catch (error) {
    console.error("The API returned an error:", error);
    return;
  }
}

export async function getMessage(auth: any, messageId: string, type: MessageBodyType = MessageBodyType.PLAIN) {
  const gmail = google.gmail({ version: "v1", auth });
  try {
    const result = await gmail.users.messages.get({
      userId: "me",
      id: messageId,
    });

    const message = result?.data;
    if (!message) {
      return null;
    }
    const headers = message.payload?.headers?.filter((header) => {
      const name = header.name;
      if (name === "Date" || name === "From" || name === "Subject") return true;
      return false;
    });

    const data = {
      id: message.id,
      snippet: message.snippet,
      Date: headers?.filter((header) => header.name === "Date")[0].value,
      From: headers?.filter((header) => header.name === "From")[0].value,
      Subject: headers?.filter((header) => header.name === "Subject")[0].value,
      body: getBody(message, type),
    };

    return data;
  } catch (error) {
    console.error("The API returned an error:", error);
    return null;
  }
}

export enum MessageBodyType {
  PLAIN = "plain",
  HTML = "html",
}
function getBody(message: any, type: MessageBodyType = MessageBodyType.PLAIN): string {
  const parts = message.payload?.parts;
  if (!parts) return "";

  for (const part of parts) {
    if (part.mimeType === `text/${type}` && part.body?.data) {
      return Buffer.from(part.body.data, "base64").toString("utf-8");
    }
  }
  return "";
}

export async function getEmails(n: number = 5, type: MessageBodyType = MessageBodyType.PLAIN) {
  const session: session | null = await getServerSession(authOption);

  if (!session) return null;

  const auth = await authorize(session.user.email);
  const emails = await listMessages(auth, n);

  if (!emails?.messages) return null;

  return {
    size: n,
    emails,
  };
}

export async function getEmailDetail(id: string, type: MessageBodyType = MessageBodyType.HTML) {
  const session: session | null = await getServerSession(authOption);

  if (!session) return null;

  const auth = await authorize(session.user.email);
  const emailDetail = await getMessage(auth, id, type);
  if (!emailDetail) return null;

  return emailDetail;
}
