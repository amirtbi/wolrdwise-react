import React from "react";
import Styles from "./AppNav.module.css";
export default function AppNav() {
  return (
    <>
      <nav className={Styles.nav}>
        <ul>
          <li>
            <NavLink to="/city">City</NavLink>
          </li>
          <li>
            <NavLink to="/countries">Countries</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
