import { useEffect, useState, useRef } from "react";
import Anchor from "components/Anchor";
import Text from "components/Text";
import Head from "next/head";

type Resp = {
  MsgId: string;
  Link: string;
};

function fetchBySearch(needle: string, page: number): string {
  if (needle === "") {
    return `http://127.0.0.1:8080/links?page=${page}&page_size=30`;
  } else {
    return `http://127.0.0.1:8080/links?q=${encodeURIComponent(
      needle
    )}&page=${page}&page_size=100`;
  }
}

export default function Links() {
  const [isLoading, setLoading] = useState(false);
  const [isNextLoading, setNextLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [links, setLinks] = useState<Resp[]>([]);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    setPage(1);
    fetch(fetchBySearch(search, 1))
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
        className="flex flex-row justify-center p-2"
        onSubmit={(e) => {
          e.preventDefault();
          searchRef.current && setSearch(searchRef.current.value);
        }}
      >
        <Text id="search" iref={searchRef} />
      </form>

      <ul className="flex flex-col">
        {links && links.length === 0 && <p>No Results</p>}
        {links &&
          links.length !== 0 &&
          links.map((link, i) => (
            <li key={i} className="grid grid-cols-12 border-2 items-center">
              <span className="text-[9px] p-1 text-gray-500 col-span-1 truncate">
                {link.MsgId}
              </span>
              <Anchor href={link.Link} otherClass="col-span-11" />
            </li>
          ))}
        {links && links.length !== 0 && (
          <button
            onClick={() => setPage(page + 1)}
            className="w-full text-white bg-blue-600 shadow-md capitalize"
          >
            more
          </button>
        )}
      </ul>
    </div>
  );
}
