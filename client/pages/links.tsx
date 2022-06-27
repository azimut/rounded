import Anchor from "components/Anchor";
import Search from "components/Search";
import useLinks from "hooks/useLinks";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Links() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [ready, setReady] = useState(false);
  const { links, isLoading } = useLinks(search, page, ready);

  useEffect(() => {
    if (router.isReady) {
      if (router.query.q) {
        setSearch(router.query.q.toString());
      }
      setReady(true);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (!ready) return;
    router.push(`/links?q=${encodeURIComponent(search)}`, undefined, {
      shallow: true,
    });
  }, [search, ready]);

  useEffect(() => setPage(1), [search]);

  return (
    <>
      <Search
        search={search}
        setSearch={setSearch}
        placeholder="search here..."
        title="links"
        idleMsg={!links || isLoading || links.length === 0 ? "No results." : ""}
      />

      <div className="grid grid-cols-12 items-center gap-px bg-slate-100">
        {links.map((link) => (
          <>
            <Link href={`message/${link.MsgId}`}>
              <span className="col-span-1 text-xs text-gray-500 text-center truncate">
                {link.MsgId}
              </span>
            </Link>
            <Anchor href={link.Link} otherClass="col-span-11 truncate" />
          </>
        ))}
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
