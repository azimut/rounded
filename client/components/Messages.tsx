import styles from "./Messages.module.css";

export const Messages = ({ children }: React.PropsWithChildren<{}>) => {
  return <div className={styles.container}>{children}</div>;
};

export default Messages;
