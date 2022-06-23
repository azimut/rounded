import { useEffect, useState, useRef } from "react";
import Button from "components/Button";
import Anchor from "components/Anchor";
import Text from "components/Text";
import Head from "next/head";

type Resp = {
  MsgId: string;
  Link: string;
};

function fetchBySearch(needle: string, page: number): string {
  if (needle === "") {
    return "http://127.0.0.1:8080/links?page_size=30";
  } else {
    return `http://127.0.0.1:8080/links?q=${encodeURIComponent(
      needle
    )}&page=${page}&page_size=30`;
  }
}

const Links = () => {
  const [search, setSearch] = useState("");
  const [links, setLinks] = useState<Resp[]>([]);
  const [isLoading, setLoading] = useState(false);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [page, setPage] = useState(1);
  useEffect(() => {
    setLoading(true);
    fetch(fetchBySearch(search, page))
      .then((res) => res.json())
      .then((data) => {
        setLinks(data);
        setLoading(false);
      })
      .catch((e) => console.error(e));
  }, [page, search]);
  useEffect(() => {
    setPage(1);
  }, [search]);
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
          searchRef.current && setSearch(searchRef.current.value);
        }}
      >
        <Text id="search" iref={searchRef} autoFocus required />
        <Button text="go" />
      </form>

      {links.length === 30 ? (
        <button
          onClick={() => {
            setPage(page + 1);
          }}
        >{`>> ${page + 1}`}</button>
      ) : null}

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
