import { Dispatch, SetStateAction, MouseEventHandler } from "react";

type Props = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  morePages: boolean;
};

type PageProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: string;
};
const Page = ({ children, onClick }: PageProps) => {
  return <button onClick={onClick}>{children}</button>;
};

export const Paginas = ({ page, setPage, morePages }: Props) => {
  return (
    <>
      {page > 1 ? (
        <Page
          onClick={() => {
            setPage(page - 1);
          }}
        >{`[${page - 1}]`}</Page>
      ) : null}
      {morePages ? (
        <Page
          onClick={() => {
            setPage(page + 1);
          }}
        >{`[${page + 1}]`}</Page>
      ) : null}
    </>
  );
};
export default Paginas;
