import styles from "./Button.module.scss";

const Button = ({ children, onClick }) => {
  return (
    <button className={styles.buttons} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
