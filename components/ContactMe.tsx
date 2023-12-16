import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { MessageList } from "@/components/message-list";
import { NewMessageForm } from "@/components/new-message-form";

// type Inputs = {
//   name: string;
//   email: string;
//   subject: string;
//   message: string;
// };

// type Props = {
//   pageInfo: PageInfo;
// };

function ContactMe() {
  const { data: session, status } = useSession();

  return (
    <div
      className="h-screen flex relative flex-col text-center md:text-left
    md:flex-row max-w-7xl justify-evenly mx-auto items-center"
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 opacity-20 text-2xl">
        Contact
      </h3>

      <div className="flex flex-col space-y-3 md:space-y-6 lg:space-y-10">
        {session ? (
          <div>
            <div className="flex space-x-1">
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
            </div>
            <div className="flex-1 overflow-y-scroll no-scrollbar p-6">
              <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center">
                  <MessageList />
                </div>
              </div>
            </div>
            <div className="p-6 bg-white/5 border-t border-[#363739]">
              <div className="max-w-4xl mx-auto">
                <NewMessageForm />
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center flex-col space-y-2.5">
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
