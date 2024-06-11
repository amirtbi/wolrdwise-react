import React from "react";
import Styles from "./CityList.module.css";
import { useCities } from "../context/CityContext";

export default function CityList() {
  const cityContextVal = useCities();

  if (cityContextVal?.isLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }
  if (!cityContextVal?.cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  return (
    <>
      <ul className={Styles.cityList}>
        {cityContextVal.cities.map((city, index) => (
          <CityItem city={city} key={index} />
        ))}
      </ul>
    </>
  );
}
function authContext() {
  throw new Error("Function not implemented.");
}
