import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { BACKEND_URL } from "services/settings";

type LinkState = {
  MsgId: string;
  Link: string;
};

async function fetchLinks(search: string, page: number): Promise<LinkState[]> {
  const url =
    search === ""
      ? `${BACKEND_URL}/links?page=${page}&page_size=50`
      : `${BACKEND_URL}/links?q=${encodeURIComponent(
          search
        )}&page=${page}&page_size=50`;
  return fetch(url).then((res) => res.json());
}

export default function useLinks(search: string): {
  links: LinkState[];
  isLoading: boolean;
  setPage: Dispatch<SetStateAction<number>>;
  moreLinks: boolean;
} {
  const [moreLinks, setMoreLinks] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [links, setLinks] = useState<LinkState[]>([]);
  useEffect(() => {
    setLoading(true);
    fetchLinks(search, page)
      .then((data) => {
        setLinks((prevLinks) => {
          setMoreLinks(data.length === 50);
          return page === 1 ? data : prevLinks.concat(data);
        });
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, [search, page]);
  return { links, isLoading, setPage, moreLinks };
}
