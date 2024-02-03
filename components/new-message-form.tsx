import { gql, useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useState } from "react";

type Props = {
  chatId: string;
  refresh: () => {};
};

const AddNewMessageMutation = gql`
  mutation AddNewMessage($username: String!, $receiverUsername: String!, $avatar: URL, $body: String!) {
    mongoDB {
      messageCreate(
        input: { username: $username, receiverUsername: $receiverUsername, avatar: $avatar, body: $body }
      ) { insertedId }
    }
  }
`;

const PopNewMessageToChatMutation = gql`
mutation UpdateChatByID ($messages: [String!]!, $id: ID!){
  mongoDB {
    chatUpdate(by: {
      id: $id
    },
    input: {
        messages: {
          push: {
            each: $messages
          }
        }
      })
    { modifiedCount }
  }
}
`;

export const NewMessageForm = ({chatId, refresh}: Props) => {
  const { data: session } = useSession();
  const [body, setBody] = useState("");
  const [addNewMessage] = useMutation(AddNewMessageMutation);
  const [popMessageToChat] = useMutation(PopNewMessageToChatMutation);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(e);
        if (body) {
          addNewMessage({
            variables: {
              username: session?.username ?? "",
              receiverUsername: session?.username != "dbrackovic2" ? "dbrackovic2" : "",
              avatar: session?.user?.image,
              body,
            },
          }).then(({data})=> {
            popMessageToChat({
              variables: {
                messages: [data.mongoDB.messageCreate.insertedId],
                id: chatId,
              }
            })
          }).then(refresh);
          setBody("");
        }
      }}
      className="flex items-center space-x-3"
    >
      <input
        autoFocus
        id="message"
        name="message"
        placeholder="Write a message..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="flex-1 h-12 px-3 rounded bg-[#222226] border border-[#222226] focus:border-[#222226] focus:outline-none text-white placeholder-white"
      />
      <button
        type="submit"
        className="bg-[#222226] rounded h-12 font-medium text-white w-24 text-lg border border-transparent hover:bg-[#363739] transition"
        disabled={!body || !session}
      >
        Send
      </button>
      <button
       className="bg-[#222226] rounded h-12 font-medium text-white w-24 text-lg border border-transparent hover:bg-[#363739] transition"
       onClick={refresh}
      >
        Fetch
      </button>
    </form>
  );
};
