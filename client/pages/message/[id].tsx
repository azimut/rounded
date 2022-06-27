import Message from "components/Message";
import useMessage from "hooks/useMessage";
import Head from "next/head";
import { useRouter } from "next/router";
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
      <main className="flex justify-center items-center min-h-screen px-5">
        <div>
          <p className="text-xs text-slate-400">
            {message.Created_At} in {message.Channel}
          </p>
          <Message usr={message.User} msg={message.Message} />
        </div>
      </main>
    </>
  );
}
