"use server";

import prisma from "@/db";
import { session } from "@/lib/auth";
import { getServerSession } from "next-auth";
import OpenAI from "openai";

async function verifyToken(key: string) {
  try {
    const openai = new OpenAI({
      apiKey: key,
    });
    const stream = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "APi Valid or not 1 or 0" }],
      stream: false,
      max_tokens: 3,
    });
    return true;
  } catch (error) {
    return false;
  }
}

export async function saveApiKey(key: string) {
  const session: session | null = await getServerSession();

  if (!session?.user)
    return {
      error: "Invalid Session",
    };
  try {
    const isValidKey = await verifyToken(key);
    if (!isValidKey)
      return {
        error: "Invalid Key",
      };
    const result = await prisma.apiStore.create({
      data: {
        APIKey: key,
        userId: session.user.email,
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    return {
      error: "Internal server",
    };
  }
}
