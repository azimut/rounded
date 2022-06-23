import { RefObject } from "react";

type Props = {
  id: string;
  iref: RefObject<HTMLInputElement>;
  autoFocus?: boolean;
  required?: boolean;
};

export const Text = ({ id, iref, autoFocus, required }: Props) => {
  return (
    <input
      ref={iref}
      required={required ? true : false}
      autoFocus={autoFocus ? true : false}
      name={id}
      id={id}
      type="text"
      placeholder="search for links..."
      className="
    text-base
    font-normal
    text-gray-700
    bg-clip-padding
    border border-solid
    border-gray-300
    bg-gray-100 focus:bg-white
    placeholder:italic placeholder:text-slate-400
    rounded-md"
    />
  );
};
export default Text;
