type Props = {
  href: string;
};

export const Anchor = ({ href }: Props) => {
  return (
    <a
      className="
      text-blue-600
      visited:text-purple-600
      hover:text-blue-700
      transition
      duration-300
      ease-in-out"
      href={href}
      rel="noreferrer noopener"
      target="_blank"
    >
      {href}
    </a>
  );
};
export default Anchor;
