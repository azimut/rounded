import Anchor from "components/Anchor";
import Search from "components/Search";
import useLinks from "hooks/useLinks";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function Links() {
  const [search, setSearch] = useState("");
  const { links, isLoading, setPage } = useLinks(search);

  const resetPage = useCallback(() => setPage(1), [setPage]);
  const nextPage = useCallback(
    () => setPage((currentPage) => currentPage + 1),
    [setPage]
  );

  useEffect(() => resetPage(), [resetPage, search]);

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
        onClick={nextPage}
        className="w-full text-white bg-blue-600 shadow-md capitalize"
      >
        more
      </button>
    </>
  );
}
