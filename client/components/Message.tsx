import styles from "./Message.module.css";

type Props = {
  usr: string;
  msg: string;
};

export const Message = ({ usr, msg }: Props) => {
  return (
    <div className={styles.message}>
      <h3 className={styles.author}>{usr}</h3>
      <p className={styles.text}>{msg}</p>
    </div>
  );
};

export default Message;
