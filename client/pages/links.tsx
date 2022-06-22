import { useEffect, useState } from "react";
import Button from "../components/Button";
import Anchor from "../components/Anchor";
import Text from "../components/Text";
import Head from "next/head";

type Resp = {
  MsgId: string;
  Link: string;
};

function fetchBySearch(needle: string): string {
  if (needle === "") {
    return "http://127.0.0.1:8080/links?page_size=30";
  } else {
    return `http://127.0.0.1:8080/links?q=${encodeURIComponent(
      needle
    )}&page_size=30`;
  }
}

const Links = () => {
  const [search, setSearch] = useState("");
  const [links, setLinks] = useState<Resp[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(fetchBySearch(search))
      .then((res) => res.json())
      .then((data) => {
        setLinks(data);
        setLoading(false);
      })
      .catch((e) => console.error(e));
  }, [submit]);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <Head>
        <title>links</title>
      </Head>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmit(!submit);
        }}
      >
        <Text
          id="search"
          value={search}
          setValue={setSearch}
          autoFocus={true}
        />
        <Button text="go" />
      </form>
      <ul className="flex flex-col">
        {links &&
          links.map((link, i) => (
            <li key={i} className="flex flex-row border-2 items-center">
              <span className="text-xs text-gray-500">{link.MsgId}</span>
              <Anchor href={link.Link} />
            </li>
          ))}
      </ul>
    </div>
  );
};
export default Links;
