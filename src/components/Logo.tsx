import React from "react";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link className={styles.logo} to="/" style={{ alignSelf: "baseline" }}>
      <img src="/logo.png" alt="WorldWise logo" />
    </Link>
  );
}

export default Logo;
