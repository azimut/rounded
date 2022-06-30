import { LinkState } from "hooks/useLinks";
import Anchor from "components/Anchor";
import Link from "next/link";

export default function LinkList({
  links,
  search,
}: {
  links: LinkState[];
  search: string;
}) {
  const addHighlight = (link: string) => {
    const pieces = link.split(search);
    return pieces.map((p, i) =>
      i == pieces.length - 1 ? (
        p
      ) : (
        <>
          {p}
          <mark>{search}</mark>
        </>
      )
    );
  };
  if (links.length === 0) return <p>No results</p>;
  return (
    <div className="grid grid-cols-12 items-center gap-px bg-slate-100">
      {links.map((link) => (
        <>
          <Link href={`message/${link.MsgId}`}>
            <span className="col-span-1 text-xs text-gray-500 text-center truncate">
              {link.MsgId}
            </span>
          </Link>
          <div className="col-span-11 truncate">
            <Anchor href={link.Link}>
              {search === "" ? link.Link : addHighlight(link.Link)}
            </Anchor>
          </div>
        </>
      ))}
    </div>
  );
}
