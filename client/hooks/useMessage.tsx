import { useEffect, useState } from "react";

type Message = {
  ID: number;
  Created_At: string;
  Window: string;
  Network: string;
  Message: string;
} | null;

export default function useMessage(id: number): {
  isLoading: boolean;
  message: Message;
} {
  const [message, setMessage] = useState<Message>(null);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(`http://127.0.0.1:8080/message/${id}`)
      .then((res) => res.json())
      .then((data: Message) => {
        setMessage(data);
        setLoading(false);
      });
  }, [id]);
  return { isLoading, message };
}
