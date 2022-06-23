import Message from "components/Message";
import { useEffect, useState } from "react";

type Response = {
  ID: number;
  Created_At: string;
  Window: string;
  Network: string;
  Message: string;
};

export default function Channels() {
  const channel = "#ecl";
  const [messages, setMessages] = useState<Response[]>([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(`http://127.0.0.1:8080/channel/${encodeURIComponent(channel)}`)
      .then((resp) => resp.json())
      .then((data) => {
        setMessages(data);
        setLoading(false);
      });
  }, []);
  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      {messages.map((msg, i) => (
        <Message usr={msg.Created_At} msg={msg.Message} key={i} />
      ))}
    </>
  );
}
