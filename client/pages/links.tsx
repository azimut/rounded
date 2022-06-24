import { useEffect, useState } from "react";
import Anchor from "components/Anchor";
import Head from "next/head";
import Search from "components/Search";
import IdleSearch from "components/IdleSearch";
import useLinks from "hooks/useLinks";

export default function Links() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { links, isLoading } = useLinks(search, page);

  useEffect(() => setPage(1), [search]);

  if (!links || isLoading) {
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

      <Search
        search={search}
        setSearch={setSearch}
        placeholder="search here..."
      />

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
