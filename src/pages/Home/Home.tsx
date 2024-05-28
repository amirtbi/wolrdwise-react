import React from "react";
import styles from "./Home.module.css";

export default function Homepage() {
  return (
    <div className={styles.homepage}>
      <PageNavs />
      <section>
        <h1>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        <Link to="/app" className="cta">
          Let's Tracking now
        </Link>
      </section>
    </div>
  );
}
