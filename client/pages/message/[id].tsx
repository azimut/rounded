import Message from "components/Message";
import useMessage from "hooks/useMessage";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function MessageID() {
  const router = useRouter();
  const msgid = Number(router.query.id);
  const { isLoading, message } = useMessage(msgid);
  useEffect(() => console.log(message), [message]);
  if (isLoading) return <p>Loading</p>;
  if (!message || !message.Message) return <p>Message {msgid} not found.</p>;
  return (
    <>
      <Head>
        <title>Message {msgid}</title>
      </Head>
      <main className="flex justify-center items-center min-h-screen px-5 bg-slate-500">
        <div className="bg-slate-100 drop-shadow-xl">
          <p className="text-xs text-slate-400">at {message.Channel}</p>
          <Message
            usr={message.User}
            date={message.Created_At}
            msg={message.Message}
          />
        </div>
      </main>
    </>
  );
}
