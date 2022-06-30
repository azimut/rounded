type Props = {
  href: string;
  children?: React.ReactNode;
};

export const Anchor = ({ href, children }: Props) => {
  return (
    <a
      className="text-blue-600
      visited:text-purple-600
      hover:text-red-600
      transition
      duration-300
      ease-in-out"
      href={href}
      rel="noreferrer noopener"
      target="_blank"
    >
      {children}
    </a>
  );
};
export default Anchor;
