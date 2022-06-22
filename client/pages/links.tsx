import { useEffect, useState } from "react";
import Button from "../components/Button";
import Anchor from "../components/Anchor";
import Text from "../components/Text";

type Resp = {
  MsgId: string;
  Link: string;
};

const Links = () => {
  const [links, setLinks] = useState<Resp[]>([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch("http://127.0.0.1:8080/links?page_size=30")
      .then((res) => res.json())
      .then((data) => {
        setLinks(data);
        setLoading(false);
      });
  }, []);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (links.length === 0) {
    return <p>No links found.</p>;
  }
  return (
    <div>
      <form>
        <Text id="search" />
        <Button text="go" />
      </form>
      <ul className="flex flex-col">
        {links.map((link, i) => (
          <li key={i}>
            <Anchor href={link.Link} />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Links;
