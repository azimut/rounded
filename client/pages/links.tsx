import Search from "components/Search";
import useLinks from "hooks/useLinks";
import { useCallback, useEffect, useRef, useState } from "react";
import LinkList from "components/LinkList";

export default function Links() {
  const [search, setSearch] = useState("");
  const { links, isLoading, setPage, moreLinks } = useLinks(search);

  const resetPage = useCallback(() => setPage(1), [setPage]);
  const nextPage = useCallback(
    () => setPage((currentPage) => currentPage + 1),
    [setPage]
  );

  const observedRef = useRef<HTMLDivElement>(null);

  useEffect(() => resetPage(), [resetPage, search]);

  useEffect(() => {
    const fn = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        console.log("intersected!");
        nextPage();
      }
    };
    const observer = new IntersectionObserver(fn, {
      rootMargin: "100px",
    });
    observedRef.current && observer.observe(observedRef.current);
    return () => observer && observer.disconnect();
  });

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
      {!isLoading && moreLinks ? (
        <div
          ref={observedRef}
          className="w-full text-white bg-blue-600 shadow-md capitalize"
        >
          more
        </div>
      ) : null}
    </>
  );
}
