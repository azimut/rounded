import Search from "components/Search";
import useLinks from "hooks/useLinks";
import { useCallback, useEffect, useState } from "react";
import LinkList from "components/LinkList";

export default function Links() {
  const [search, setSearch] = useState("");
  const { links, isLoading, setPage, moreLinks } = useLinks(search);

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

      <LinkList links={links} />

      {links.length !== 0 && moreLinks && (
        <button
          onClick={nextPage}
          className="w-full text-white bg-blue-600 shadow-md capitalize"
        >
          more
        </button>
      )}
    </>
  );
}
