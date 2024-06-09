import { AuthOptions, Session } from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "@/db";

const scope = ["openid", "email", "profile", "https://www.googleapis.com/auth/gmail.readonly", "https://www.googleapis.com/auth/gmail.addons.current.message.readonly"]

export interface session extends Session {
    user: {
        id: string,
        email: string,
        name: string,
        image: string
    }
}

interface user {
    id: string;
    name: string;
    email: string;
    token: string;
}


export const authOption: AuthOptions = {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            authorization: {
                params: {
                    scope: scope.join(" "),
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        signIn: async ({ account, profile, user }) => {
            try {
                if (account?.provider !== "credentials") {
                    const result = await prisma.user.upsert({
                        where: {
                            email: profile?.email as string
                        },
                        update: {
                            name: profile?.name,
                            accessToken: account?.access_token,
                            refreshToken: account?.refresh_token
                        },
                        create: {
                            email: profile?.email as string,
                            name: profile?.name as string,
                            accessToken: account?.access_token,
                            refreshToken: account?.refresh_token
                        }
                    })
                    user.id = result.id
                    return true;
                }
            } catch (error) {
                return false;
            }
            return false;
        },
        session: async ({ session, token }: any) => {
            const newSession: session = session;
            if (session.user) {
                newSession.user.id = token.sub;
            }
            return newSession;
        }
    }
}