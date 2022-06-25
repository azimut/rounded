import { useState, useEffect } from "react";

type Resp = {
  MsgId: string;
  Link: string;
};

function fetchBySearch(needle: string, page: number): string {
  if (needle === "") {
    return `http://127.0.0.1:8080/links?page=${page}&page_size=50`;
  } else {
    return `http://127.0.0.1:8080/links?q=${encodeURIComponent(
      needle
    )}&page=${page}&page_size=50`;
  }
}

export default function useLinks(search: string, page: number) {
  const [isLoading, setLoading] = useState(false);
  const [links, setLinks] = useState<Resp[]>([]);
  useEffect(() => {
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
  }, [search, page]);
  return { links, isLoading };
}
