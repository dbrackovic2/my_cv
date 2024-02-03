import { useQuery, gql } from "@apollo/client";
// import { useEffect } from "react";
// import { useInView } from "react-intersection-observer";

import type { Message as IMessage } from "@/components/message";
import { Message } from "@/components/message";

type Props = {
  messages: string[];
};

const GetRecentMessagesQuery = gql`
  query GetRecentMessages($last: Int) {
    mongoDB {
      messageCollection(last: $last) {
        edges {
          node {
            id
            username
            receiverUsername
            avatar
            body
          }
        }
      }
    }
  }
`;

const GetMessagesByIDQuery = gql`
query GetMessagesByID($last: Int, $ids: [ID]) {
  mongoDB {
    messageCollection(last: $last, filter: {
      id: {
        in: $ids
      }
    }) {
      edges {
        node {
          id
          username
          receiverUsername
          avatar
          body
        }
      }
    }
  }
}
`;

export const MessageList = ({messages}: Props) => {
  // const [scrollRef, inView, entry] = useInView({
  //   trackVisibility: true,
  //   delay: 1000,
  // });

  const { loading, error, data } = useQuery<{
    mongoDB: {messageCollection: { edges: { node: IMessage }[] }};
  }>(GetMessagesByIDQuery, {
    variables: {
      "last": 1000,
      "ids": messages,
    },
  });

  // useEffect(() => {
  //   if (entry?.target) {
  //     entry.target.scrollIntoView({ behavior: "smooth", block: "end" });
  //   }
  // }, [data?.mongoDB.messageCollection.edges.length, entry?.target]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-white">Fetching most recent chat messages.</p>
      </div>
    );

  if (error)
    return (
      <p className="text-white">Something went wrong. {error.toString()}</p>
    );

  return (
    <div className="flex flex-col max-h-[70vh] w-full space-y-3 overflow-y-scroll">
      {/* {!inView && data?.mongoDB.messageCollection.edges.length && (
        <div className="py-1.5 w-full px-3 z-10 text-xs absolute flex justify-center bottom-0 mb-[120px] inset-x-0">
          <button
            className="py-1.5 px-3 text-xs bg-[#1c1c1f] border border-[#363739] rounded-full text-white font-medium"
            onClick={() => {
              entry?.target.scrollIntoView({ behavior: "smooth", block: "end" })
            }}
          >
            Scroll to see latest messages
          </button>
        </div>
      )} */}
      {data?.mongoDB.messageCollection?.edges?.map(({ node }) => (
        <Message key={node?.id} message={node} />
      ))}
      {/* <div ref={scrollRef} /> */}
    </div>
  );
};