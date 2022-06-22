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
    <div>
      <form>
        <input
          name=""
          type="text"
          value=""
          className="
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded"
        />
        <button
          className="
          px-2 py-1
          bg-blue-600
          text-white
          uppercase
          rounded
          shadow-md
          text-xs"
        >
          Go
        </button>
      </form>
      <ul className="flex flex-col">
        {links.map((link, i) => (
          <li key={i}>
            <a
              className="text-blue-600 visited:text-purple-600 hover:text-blue-700 transition duration-300 ease-in-out"
              href={link.Link}
              rel="noreferrer noopener"
              target="_blank"
            >
              {link.Link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Links;
