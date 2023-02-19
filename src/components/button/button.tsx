import React from "react";
import styles from './button.module.scss'

interface ChildComponentProps {
  text: string;
}
const Button = ({text}: ChildComponentProps) => {
  return <button className={styles.btn}>{text}</button>
}

export default Button