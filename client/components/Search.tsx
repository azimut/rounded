import styles from "./Search.module.css";
import { useState } from "react";

export default function Search({ onSubmit = (f: string) => f }) {
  const [search, setSearch] = useState("");
  const submit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(search);
    setSearch("");
  };
  return (
    <div className={styles.search}>
      <form onSubmit={submit}>
        <input
          autoFocus
          required
          name=""
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="search by text"
        />
        <button>Go</button>
      </form>
    </div>
  );
}
