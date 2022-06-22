import { useState } from "react";

type Props = {
  id: string;
};

export const Text = ({ id }: Props) => {
  const [value, setValue] = useState("");
  return (
    <input
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
