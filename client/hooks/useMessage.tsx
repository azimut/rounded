import { useEffect, useState } from "react";

type MessageState = {
  ID: number;
  Created_At: string;
  Channel: string;
  User: string;
  Message: string;
} | null;

export default function useMessage(id: number): {
  isLoading: boolean;
  message: MessageState;
} {
  const [message, setMessage] = useState<MessageState>(null);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(`http://127.0.0.1:8080/message/${id}`)
      .then((res) => res.json())
      .then((data: MessageState) => {
        setMessage(data);
        setLoading(false);
      });
  }, [id]);
  return { isLoading, message };
}
