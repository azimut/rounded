import { useState, useEffect } from "react";
import { BACKEND_URL } from "services/settings";

type Resp = {
  MsgId: string;
  Link: string;
};

function fetchBySearch(needle: string, page: number): string {
  if (needle === "") {
    return `${BACKEND_URL}/links?page=${page}&page_size=50`;
  } else {
    return `${BACKEND_URL}/links?q=${encodeURIComponent(
      needle
    )}&page=${page}&page_size=50`;
  }
}

export default function useLinks(
  search: string,
  page: number,
  now: boolean
): { links: Resp[]; isLoading: boolean } {
  const [isLoading, setLoading] = useState(false);
  const [links, setLinks] = useState<Resp[]>([]);
  useEffect(() => {
    if (!now) return;
    setLoading(true);
    fetch(fetchBySearch(search, page))
      .then((res) => res.json())
      .then((data: Resp[]) => {
        setLinks((prevLinks) => {
          return page === 1 ? data : [...prevLinks, ...data];
        });
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, [search, page, now]);
  return { links, isLoading };
}
