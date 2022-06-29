export const Message = ({
  usr,
  date,
  msg,
}: {
  usr: string;
  date: string;
  msg: string;
}) => {
  return (
    <section className="grid grid-cols-5">
      <div className="col-span-1 justify-self-center flex flex-col">
        <h3 className="text-xs text-slate-500">{usr}</h3>
        <h3 className="text-xs text-slate-300">{date}</h3>
      </div>
      <p className="text-base overflow-clip col-span-4 row-span-5">{msg}</p>
    </section>
  );
};

export default Message;
