type Props = {
  usr: string;
  msg: string;
};

export const Message = ({ usr, msg }: Props) => {
  return (
    <div className="grid grid-cols-5">
      <h3 className="text-xs text-slate-500 col-span-1 truncate">{usr}</h3>
      <p className="text-base overflow-clip col-span-4">{msg}</p>
    </div>
  );
};

export default Message;
