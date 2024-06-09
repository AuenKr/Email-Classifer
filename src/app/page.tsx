import { getServerSession } from "next-auth";
import { OpenApiKey } from "@/components/OpenApiKey";
import { SignInBtn } from "@/components/SignInBtn";

export default async function Home() {
  const session = await getServerSession(); 
  return (
    <main className="w-full h-full min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl p-2 m-2 text-center">Hello Gmail reader</h1>
      <div className="text-center space-y-3">
        <div className="text-lg font-bold">
          {session?.user ? `Hello ${session.user.name}` : <SignInBtn />}
        </div>
        <div>{session?.user && <OpenApiKey />}</div>
      </div>
    </main>
  );
}
