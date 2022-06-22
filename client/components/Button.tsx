type Props = {
  text: string;
};

export const Button = ({ text }: Props) => {
  return (
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
      {text}
    </button>
  );
};

export default Button;
