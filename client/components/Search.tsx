import Text from "components/Text";
import Head from "next/head";
import { Dispatch, SetStateAction } from "react";

type Props = {
  placeholder: string;
  idleMsg: string;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
};

export default function Search({
  idleMsg,
  search,
  setSearch,
  placeholder,
}: Props) {
  return (
    <>
      <Head>
        <title>{idleMsg}</title>
      </Head>
      <Text search={search} setSearch={setSearch} placeholder={placeholder} />
      {idleMsg === "" && <p>{idleMsg}</p>}
    </>
  );
}
