import { useEffect, useState } from "react";
import Anchor from "components/Anchor";
import Search from "components/Search";
import useLinks from "hooks/useLinks";

export default function Links() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { links, isLoading } = useLinks(search, page);

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
