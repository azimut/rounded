import { useState, useEffect, Dispatch, SetStateAction } from "react";
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

export default function useLinks(search: string): {
  links: Resp[];
  isLoading: boolean;
  setPage: Dispatch<SetStateAction<number>>;
} {
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [links, setLinks] = useState<Resp[]>([]);
  useEffect(() => {
    setLoading(true);
    fetch(fetchBySearch(search, page))
      .then((res) => res.json())
      .then((data: Resp[]) => {
        setLinks((prevLinks) => {
          return page === 1 ? data : prevLinks.concat(data);
        });
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, [search, page]);
  return { links, isLoading, setPage };
}
