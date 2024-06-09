import { emailClassifier } from "@/actions/classifier";
import { MessageBodyType, getEmailDetail } from "@/actions/email";
import { EmailType } from "@/components/Emails";
import prisma from "@/db";
import { authOption, session } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

async function processEmails(emails: EmailType[], userId: string, openApiKey: string) {
  const emailProcessingPromises = emails.map(async (email) => {
    const emailDetail = await getEmailDetail(email.id, MessageBodyType.PLAIN);

    if (!emailDetail) return null;
    const classification: string = await emailClassifier(emailDetail.body, openApiKey);

    return {
      id: email.id,
      label: classification,
    };
  });

  const emailClassifications = await Promise.all(emailProcessingPromises);

  return emailClassifications;
}

export async function POST(req: NextRequest) {
  try {
    const session: session | null = await getServerSession(authOption);
    if (!session?.user.email)
      return NextResponse.json(
        {
          error: "Invalid User",
        },
        { status: 403 }
      );

    const { emails }: { emails: EmailType[] } = await req.json();
    if (!emails.length)
      return NextResponse.json(
        {
          error: "Invalid Input",
        },
        { status: 404 }
      );

    const res = await prisma.apiStore.findFirst({
      where: {
        userId: session.user.email,
      },
      select: {
        APIKey: true,
      },
    });
    const openApiKey = res?.APIKey;
    if (!openApiKey) {
      return NextResponse.json(
        {
          error: "Invalid Api Key",
        },
        { status: 404 }
      );
    }

    const result = await processEmails(emails, session.user.email, openApiKey);

    return NextResponse.json({
      msg: "Email Label",
      emails: result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
        detail: error,
      },
      { status: 501 }
    );
  }
}
