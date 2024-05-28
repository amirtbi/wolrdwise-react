import React from "react";
import Styles from "./AppLayout.module.css";
import Map from "../../components/Map";
export default function AppLayout() {
  return (
    <>
      <div className={Styles.app}>
        <p>app layout</p>
        <Sidebar />
        <Map />
      </div>
    </>
  );
}
