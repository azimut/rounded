import { Dispatch, SetStateAction, useRef } from "react";

type Props = {
  onSubmit: Dispatch<SetStateAction<string>>;
  placeholder?: string;
  autofocus?: boolean;
  required?: boolean;
};

export default function Search({
  onSubmit,
  placeholder = "",
  autofocus = false,
  required = false,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const submit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const search = inputRef.current ? inputRef.current.value : "";
    onSubmit(search);
  };
  return (
    <form onSubmit={submit} className="flex flex-row justify-center p-2">
      <input
        type="text"
        ref={inputRef}
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
