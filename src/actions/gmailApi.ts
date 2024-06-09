import prisma from "@/db";
import { google } from "googleapis";

export async function authorize(email: string) {
  const result = await prisma.user.findFirst({
    where: {
      email,
    },
    select: {
      refreshToken: true
    }
  })
  if (!result)
    return null;

  let client: any =
  {
    type: "authorized_user",
    client_id: process.env.GOOGLE_CLIENT_ID || "Your Google OAuth client id",
    client_secret: process.env.GOOGLE_CLIENT_SECRET || "Your Google OAuth client secret",
    refresh_token: result?.refreshToken
  }
  return google.auth.fromJSON(client)
}
