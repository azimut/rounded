import Text from "components/Text";
import Head from "next/head";
import { Dispatch, SetStateAction } from "react";

type Props = {
  title: string;
  placeholder: string;
  idleMsg: string;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
};

export default function Search({
  title,
  idleMsg,
  search,
  setSearch,
  placeholder,
}: Props) {
  return (
    <>
      <Head>
        <title>{idleMsg === "" ? title : idleMsg}</title>
      </Head>
      <div className="bg-slate-500">
        <Text search={search} setSearch={setSearch} placeholder={placeholder} />
      </div>
      {idleMsg === "" && <p>{idleMsg}</p>}
    </>
  );
}
