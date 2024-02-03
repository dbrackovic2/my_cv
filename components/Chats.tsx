import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Chat } from "@/components/Chat";

export type Chat = {
  id: string;
  members: string[];
  messages: string[];
};

type Props = {
    username: string;
}

const GetChatByMemberQuery = gql`
query GetChatByMember($last: Int, $member: String) {
  mongoDB {
    chatCollection (last: $last, filter: {
      members: {
        elemMatch: {
          eq: $member
        }
      }
    }) {
      edges {
        node {
          id
          members
          messages
        }
      }
    }
  }
}
`;

const AddNewChatMutation = gql`
mutation AddNewChat(
  $members: [String!]!
) {
  mongoDB {
    chatCreate(
      input: {
        members: $members
      }
    ) { insertedId }
  }
}
`;

export const Chats = ({username}: Props) => {
  const [disableCreateChat, setDisableCreateChat] = React.useState(false);
  const { loading, data, refetch } = useQuery<{
    mongoDB: {chatCollection: { edges: { node: Chat }[] }};
  }>(GetChatByMemberQuery, {
    variables: {
      "last": 100,
      "member": username
    }
  });
  const [createNewChat] = useMutation(AddNewChatMutation);
  const handleRefresh = () => refetch();
  const handleChatCreation = () => {
    setDisableCreateChat(true);
    createNewChat({
      variables: {
        members: [username, "dbrackovic2"],
      }
    }).then(handleRefresh);
  };

  if (loading) {
    return (
      <div>Loading chat</div>
    )
  }

  return (
    <div>
      {
      data?.mongoDB.chatCollection?.edges?.length == 0 ? <button onClick={handleChatCreation} disabled={disableCreateChat}>{disableCreateChat ? 'Creating...' : 'Start chat'}</button> :
      data?.mongoDB.chatCollection?.edges?.map(({ node }) => (
        <Chat key={node?.id} id={node.id} />
      ))}
    </div>
  );
};
