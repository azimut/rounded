import { useEffect, useState } from "react";
import Button from "../components/Button";
import Anchor from "../components/Anchor";
import Text from "../components/Text";
import Head from "next/head";

type Resp = {
  MsgId: string;
  Link: string;
};

const Links = () => {
  const [search, setSearch] = useState("");
  const [links, setLinks] = useState<Resp[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const fetchBySearch = (needle: string): string => {
    if (needle === "") {
      return "http://127.0.0.1:8080/links?page_size=30";
    } else {
      return `http://127.0.0.1:8080/links/${needle}?page_size=30`;
    }
  };
  useEffect(() => {
    setLoading(true);
    fetch(fetchBySearch(search))
      .then((res) => res.json())
      .then((data) => {
        setSearch("");
        setLinks(data);
        setLoading(false);
      })
      .catch((e) => console.error(e));
  }, [submit]);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!links) {
    return <p>No links found.</p>;
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
