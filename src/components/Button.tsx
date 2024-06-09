import React from "react";
import Styles from "./button.module.css";
type BtnProps = {
  children: JSX.Element[] | JSX.Element | string;
  onClick?: (e: any) => any;
  type: string;
};
export default function Button(props: BtnProps) {
  const { children, onClick, type } = props;
  return (
    <>
      <button
        onClick={(e) => onClick?.(e)}
        className={`${Styles.btn} ${Styles[type]}
        }`}
      >
        {children}
      </button>
    </>
  );
}
