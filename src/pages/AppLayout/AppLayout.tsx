import React from "react";
import Styles from "./AppLayout.module.css";
import Map from "../../components/Map";
import User from "../../components/User";
export default function AppLayout() {
  return (
    <>
      <div className={Styles.app}>
        <p>app layout</p>
        <Sidebar />
        <Map />
        <User />
      </div>
    </>
  );
}
