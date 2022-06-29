import { LinkState } from "hooks/useLinks";
import Anchor from "components/Anchor";
import Link from "next/link";

export default function LinkList({ links }: { links: LinkState[] }) {
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
          <Anchor href={link.Link} otherClass="col-span-11 truncate" />
        </>
      ))}
    </div>
  );
}
