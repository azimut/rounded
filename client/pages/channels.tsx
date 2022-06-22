import Messages from "../components/Messages";
import Message from "../components/Message";
import Search from "../components/Search";
import { messages } from "./data.json";
import { useState } from "react";

export default function Channels() {
  const [term, setTerm] = useState("");
  return (
    <div className="container">
      <Search
        onSubmit={(s: string) => {
          setTerm(s);
          return "";
        }}
      />
      <Messages>
        {messages.map((message, id) => (
          <Message key={id} {...message} />
        ))}
      </Messages>
    </div>
  );
}
