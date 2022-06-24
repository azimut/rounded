import { Dispatch, SetStateAction } from "react";

type Props = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  placeholder?: string;
  autofocus?: boolean;
  required?: boolean;
};

export default function Search({
  search,
  setSearch,
  placeholder = "",
  autofocus = false,
  required = false,
}: Props) {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-row justify-center p-2"
    >
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        autoFocus={autofocus}
        required={required}
        placeholder={placeholder}
        className="bg-gray-100
      text-base font-normal text-gray-700
      border border-gray-300 rounded-md
      placeholder:italic placeholder:text-slate-400"
      />
    </form>
  );
}
