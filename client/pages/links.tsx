import { useEffect, useState } from "react";

type Resp = {
  MsgId: string;
  Link: string;
};

const Links = () => {
  const [links, setLinks] = useState<Resp[]>([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch("http://127.0.0.1:8080/links?page_size=30")
      .then((res) => res.json())
      .then((data) => {
        setLinks(data);
        setLoading(false);
      });
  }, []);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (links.length === 0) {
    return <p>No links found.</p>;
  }

  return (
    <div className="container">
      <ul>
        {links.map((link, i) => (
          <li key={i}>
            <a href={link.Link} rel="noreferrer noopener" target="_blank">
              {link.Link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Links;
