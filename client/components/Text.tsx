import { Dispatch, SetStateAction } from "react";

type Props = {
  id: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  autoFocus: boolean;
};

export const Text = ({ id, value, setValue, autoFocus }: Props) => {
  return (
    <input
      autoFocus={autoFocus}
      onChange={(e) => setValue(e.target.value)}
      name={id}
      id={id}
      type="text"
      value={value}
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
