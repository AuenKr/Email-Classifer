import { getEmails } from "@/actions/email";
import { authOption } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOption);
    if (!session)
      return NextResponse.json(
        {
          error: "Invalid User",
        },
        { status: 403 }
      );

    const searchParams = req.nextUrl.searchParams;
    let noEmail = parseInt(searchParams.get("noEmail") || "0");
    if (!noEmail) noEmail = 5;

    const listEmail = await getEmails(noEmail);
    console.log("Email list", listEmail);
    return NextResponse.json({
      msg: "Email found",
      email: listEmail?.emails.messages,
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
