import "../styles.css";
import { Messages } from "../components/Messages";
import { useEffect, useState } from "react";

export default function App() {
  const [links, setLinks] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/apilinks?page_size=20")
      .then((res) => res.json())
      .then((data) => {
        setLinks(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!links) {
    return <p>No links found.</p>;
  }

  return (
    <div className="container">
      <Messages>
        <ul>
          {links.map((link, i) => (
            <li key={i}>
              <a href={link.Link} rel="noreferrer noopener" target="_blank">
                {link.Link}
              </a>
            </li>
          ))}
        </ul>
      </Messages>
    </div>
  );
}
