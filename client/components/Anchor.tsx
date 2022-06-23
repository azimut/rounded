type Props = {
  href: string;
  otherClass?: string;
};

export const Anchor = ({ href, otherClass }: Props) => {
  const finalClass = `${otherClass}
      text-blue-600
      visited:text-purple-600
      hover:text-blue-700
      transition
      duration-300
      ease-in-out`;
  return (
    <a
      className={finalClass}
      href={href}
      rel="noreferrer noopener"
      target="_blank"
    >
      {href}
    </a>
  );
};
export default Anchor;
