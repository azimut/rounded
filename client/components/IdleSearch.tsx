import Head from "next/head";
import { Dispatch, SetStateAction } from "react";
import Search from "components/Search";

type Props = {
  title: string;
  message: string;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
};

export default function IdleSearch({
  title,
  message,
  search,
  setSearch,
}: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Search search={search} setSearch={setSearch} autofocus />
      <p>{message}</p>
    </>
  );
}
