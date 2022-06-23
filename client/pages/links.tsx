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
    )}&page=${page}&page_size=100`;
  }
}

const Links = () => {
  const [isLoading, setLoading] = useState(false);
  const [isNextLoading, setNextLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [links, setLinks] = useState<Resp[]>([]);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    setPage(1);
    fetch(fetchBySearch(search, page))
      .then((res) => res.json())
      .then((data: Resp[]) => {
        setLinks(data);
        setLoading(false);
      });
  }, [search]);

  useEffect(() => {
    if (isLoading) return;
    setNextLoading(true);
    fetch(fetchBySearch(search, page))
      .then((res) => res.json())
      .then((data: Resp[]) => {
        setLinks(links.concat(data));
        setNextLoading(false);
      });
  }, [page]);

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
        <Text id="search" iref={searchRef} autoFocus />
        <Button text="go" />
      </form>

      <ul className="flex flex-col">
        {links &&
          links.map((link, i) => (
            <li key={i} className="flex flex-row border-2 items-center">
              <span className="text-[9px] p-1 text-gray-500">{link.MsgId}</span>
              <Anchor href={link.Link} />
            </li>
          ))}
      </ul>
      <button
        onClick={() => setPage(page + 1)}
        className="w-full text-white bg-blue-600 shadow-md capitalize"
      >
        more
      </button>
    </div>
  );
};
export default Links;
