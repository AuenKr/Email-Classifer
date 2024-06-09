import { MessageBodyType, getEmailDetail, getMessage } from "@/actions/email";
import { authOption, session } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session: session | null = await getServerSession(authOption);
    if (!session)
      return NextResponse.json(
        {
          error: "Invalid User",
        },
        { status: 403 }
      );

    const id = params.id;
    let type = "html";

    if (!id)
      return NextResponse.json(
        {
          error: "Invalid inputs",
        },
        { status: 403 }
      );

    const email = await getEmailDetail(id as string, type === "html" ? MessageBodyType.HTML : MessageBodyType.PLAIN);

    return NextResponse.json(
      {
        email,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Erro 1r",
        detail: error,
      },
      { status: 500 }
    );
  }
}
