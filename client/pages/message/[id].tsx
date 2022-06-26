import useMessage from "hooks/useMessage";
import Message from "components/Message";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect } from "react";

export default function MessageID() {
  const router = useRouter();
  const id = Number(router.query.id);
  const { isLoading, message } = useMessage(id);
  useEffect(() => console.log(message), [message]);
  if (isLoading) return <p>Loading</p>;
  if (!message || !message.Message) return <p>Message {id} not found.</p>;
  return (
    <>
      <Head>
        <title>Message {id}</title>
      </Head>
      <Message
        usr={message.Message.split(">")[0]}
        msg={message.Message.split(">")[1]}
      />
    </>
  );
}
