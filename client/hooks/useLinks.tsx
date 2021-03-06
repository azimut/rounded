import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { BACKEND_URL, START_PAGE, RESULTS_PER_PAGE } from "services/settings";

export type LinkState = {
  MsgId: string;
  Link: string;
};

async function fetchLinks(search: string, page: number): Promise<LinkState[]> {
  const url =
    search === ""
      ? `${BACKEND_URL}/links?page=${page}&page_size=${RESULTS_PER_PAGE}`
      : `${BACKEND_URL}/links?q=${encodeURIComponent(
          search
        )}&page=${page}&page_size=${RESULTS_PER_PAGE}`;
  return fetch(url).then((res) => res.json());
}

export default function useLinks(search: string): {
  links: LinkState[];
  isLoading: boolean;
  setPage: Dispatch<SetStateAction<number>>;
  hasMorePages: boolean;
  hasError: boolean;
} {
  const [hasMorePages, setMorePages] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [links, setLinks] = useState<LinkState[]>([]);
  const [page, setPage] = useState(START_PAGE);
  const [hasError, setHasError] = useState(false);
  useEffect(() => setPage(START_PAGE), [search]);
  useEffect(() => setMorePages(true), [search]);
  useEffect(() => {
    if (!hasMorePages) return;
    setLoading(true);
    fetchLinks(search, page)
      .then((data) =>
        setLinks((prevLinks) => {
          setMorePages(data.length === RESULTS_PER_PAGE);
          return page === START_PAGE ? data : prevLinks.concat(data);
        })
      )
      .catch(() => setHasError(true))
      .finally(() => setLoading(false));
  }, [search, page, hasMorePages]);
  return { links, isLoading, setPage, hasMorePages, hasError };
}
