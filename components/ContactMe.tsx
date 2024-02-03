import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Chats } from "@/components/Chats";

function ContactMe() {
  const { data: session, status } = useSession();
  const [chatWithDajan, setChatWithDajan] = React.useState(false);
  const chatWithDajanOnClick = () => setChatWithDajan(!chatWithDajan);

  return (
    <div className="h-screen text-center md:text-left md:flex-row max-w-7xl justify-evenly mx-auto items-center">
      <div className="space-y-3 md:space-y-6 lg:space-y-10">
        {session ? (
          <div>
            <div className="flex space-x-1 pt-14">
              {session?.user?.image && (
                <div className="w-12 h-12 rounded overflow-hidden">
                  <Image
                    width={50}
                    height={50}
                    src={session?.user?.image}
                    alt={session?.user?.name || "User profile picture"}
                    title={session?.user?.name || "User profile picture"}
                  />
                </div>
              )}
              <button
                onClick={() => signOut()}
                className="bg-white/5 rounded h-12 px-6 font-medium text-white border border-transparent"
              >
                Sign out
              </button>
              <button onClick={chatWithDajanOnClick} className="bg-white/5 rounded h-12 px-6 font-medium text-white border border-transparent">Chat with Dajan</button>
            </div>
            {chatWithDajan && <Chats username={session?.username ?? ''}/>}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center flex-col space-y-2.5">
            <h3 className="pt-10 uppercase tracking-[20px] text-gray-500 opacity-20 text-2xl">Contact</h3>
            {status === "loading" ? null : (
              <div className="flex items-center">
                <button
                  onClick={() => signIn("github")}
                  className="bg-white/5 rounded h-12 px-6 font-medium text-white text-lg border border-transparent inline-flex items-center"
                >
                  Sign in with GitHub
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactMe;
