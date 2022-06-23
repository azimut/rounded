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
      className="
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded"
    />
  );
};
export default Text;
