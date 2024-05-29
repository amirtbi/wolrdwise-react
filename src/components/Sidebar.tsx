import React from "react";
import Styles from "./Sidebar.module.css";
export default function SideBar() {
  return (
    <>
      <div className={Styles.sidebar}>
        <Logo />
        <AppNav />
        <Outlet/>

        <footer className={Styles.footer}>
          <p className={Styles.copyright}>
            &copy; Copyright {new Date().getFullYear()} by worldwise Inc.
          </p>
        </footer>
      </div>
    </>
  );
}
