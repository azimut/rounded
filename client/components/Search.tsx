import { Dispatch, SetStateAction, useRef } from "react";

type Props = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  onSubmit: Dispatch<SetStateAction<boolean>>;
  placeholder?: string;
  autofocus?: boolean;
  required?: boolean;
};

export default function Search({
  search,
  setSearch,
  onSubmit,
  placeholder = "",
  autofocus = false,
  required = false,
}: Props) {
  const submit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(true);
  };
  return (
    <form onSubmit={submit} className="flex flex-row justify-center p-2">
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
