import Search from "components/Search";
import useLinks from "hooks/useLinks";
import { useCallback, useState } from "react";
import LinkList from "components/LinkList";
import useInfinity from "hooks/useInfinity";

export default function Links() {
  const [search, setSearch] = useState("");
  const { links, isLoading, setPage, moreLinks } = useLinks(search);
  const nextPage = useCallback(
    () => setPage((currentPage) => currentPage + 1),
    [setPage]
  );
  const { ref } = useInfinity({ onViewport: nextPage, rootMargin: "100px" });
  return (
    <>
      <Search
        search={search}
        setSearch={setSearch}
        placeholder="search here..."
        title="links"
        idleMsg={!links || isLoading || links.length === 0 ? "No results." : ""}
      />
      <LinkList links={links} search={search} />
      {!isLoading && moreLinks ? (
        <div
          ref={ref}
          className="w-full text-white bg-blue-600 shadow-md capitalize"
        >
          more
        </div>
      ) : null}
    </>
  );
}
