import React from "react";
import { MessageList } from "@/components/message-list";
import { NewMessageForm } from "@/components/new-message-form";
import { useQuery, gql } from "@apollo/client";

const GetChatByIDQuery = gql`
query GetChatByID($id: ID!){
    mongoDB {
      chat(
        by: {
          id: $id
        }
      ) {
        messages
      }
    }
  }
`;

type Props = {
    id: string;
};

export const Chat = ({id}: Props) => {
  const { loading, error, data, refetch } = useQuery<{
      mongoDB: {chat: { messages: string[] }};
    }>(GetChatByIDQuery, {
      variables: {
        id: id,
      }
    });
  const [toggleMessageList, setToggleMessageList] = React.useState(true);
  const handleRefresh = () => refetch();
  const onClickHandler = () => setToggleMessageList(!toggleMessageList);

  return (
      <div>
          <button onClick={onClickHandler}>{toggleMessageList ? 'Hide messages' : 'Show messages'}</button>
          <div className="flex-1 p-6">
              <div className="max-w-4xl max-h-fit mx-auto">
                <div className="flex justify-between items-center">
                  {toggleMessageList && <MessageList messages={data?.mongoDB.chat.messages || []} />}
                </div>
              </div>
          </div>
          <div className="p-6 bg-white/5 border-t border-[#363739]">
              <div className="max-w-4xl mx-auto">
                <NewMessageForm chatId={id} refresh={handleRefresh} />
              </div>
          </div>
      </div>
  );
};
