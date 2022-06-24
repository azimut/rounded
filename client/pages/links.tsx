import { useEffect, useState } from "react";
import Anchor from "components/Anchor";
import Head from "next/head";
import Search from "components/Search";
import IdleSearch from "components/IdleSearch";

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
  const [search, setSearch] = useState("");
  const [doSearch, setDoSearch] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [isNextLoading, setNextLoading] = useState(false);

  const [links, setLinks] = useState<Resp[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetch(fetchBySearch(search, page))
      .then((res) => res.json())
      .then((data: Resp[]) => {
        setLinks((prevLinks) => {
          return page === 1 ? data : prevLinks.concat(data);
        });
        setLoading(false);
      });
  }, [search, page]);

  useEffect(() => setPage(1), [search]);

  if (isLoading) {
    return (
      <IdleSearch
        title="loading..."
        message="loading.."
        search={search}
        setSearch={setSearch}
      />
    );
  }

  if (links && links.length === 0) {
    return (
      <IdleSearch
        title="links"
        message="No results..."
        search={search}
        setSearch={setSearch}
      />
    );
  }

  return (
    <>
      <Head>
        <title>links</title>
      </Head>

      <Search search={search} setSearch={setSearch} autofocus />

      <div className="bg-slate-200">
        <div className="grid grid-cols-12 items-center gap-px bg-slate-50">
          {links.map((link) => (
            <>
              <span className="col-span-1 text-xs text-gray-500 text-center truncate">
                {link.MsgId}
              </span>
              <Anchor href={link.Link} otherClass="col-span-11 truncate" />
            </>
          ))}
        </div>
      </div>

      <button
        onClick={() => setPage(page + 1)}
        className="w-full text-white bg-blue-600 shadow-md capitalize"
      >
        more
      </button>
    </>
  );
}
