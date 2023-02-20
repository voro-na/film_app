import React from "react";
import styles from './button.module.scss'
import {Link} from "react-router-dom";

interface buttonProps {
  text: string;
  link: string;
}
interface buttonLoadProps{
  text: string;

}
const Button = ({text, link}: buttonProps) => {
  return <Link to = {link} className={styles.btn}>{text}</Link>
}

export const ButtonLoad = ({text}: buttonLoadProps) => {
  return <button className={styles.btn}>{text}</button>
}


export default Button