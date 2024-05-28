import React from "react";
import Styles from "./PageNavs.module.css";
export default function PageNavs() {
  return (
    <>
      <nav className={Styles["nav"]}>
        <div>
          <Logo />
        </div>
        <ul>
          <Link style={{ padding: "5px" }} to="/product">
            Product
          </Link>
          <Link style={{ padding: "5px" }} to="/pricing">
            Pricing
          </Link>
          <Link style={{ padding: "5px" }} to="/login">
            Login
          </Link>
        </ul>
      </nav>
    </>
  );
}
