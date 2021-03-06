import Message from "components/Message";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "services/settings";

type ChannelState = {
  ID: number;
  Created_At: string;
  Channel: string;
  User: string;
  Message: string;
};

export default function Channel() {
  const router = useRouter();
  const channel = String(router.query.id || "");
  const [messages, setMessages] = useState<ChannelState[]>([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    if (channel == "") return;
    setLoading(true);
    fetch(
      `${BACKEND_URL}/channel/${encodeURIComponent(
        channel
      )}?page=1&page_size=30`
    )
      .then((resp) => resp.json())
      .then((data) => {
        setMessages(data);
        setLoading(false);
      });
  }, [channel]);
  if (!messages) return <p>Channel not found</p>;
  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="flex flex-col">
      <header className="text-center bg-slate-500 text-slate-100 font-bold">
        #{channel}
      </header>
      <main>
        {messages.map((msg, i) => (
          <Message usr={msg.User} msg={msg.Message} key={i} />
        ))}
      </main>
    </div>
  );
}
