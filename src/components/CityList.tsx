import React from "react";
import Styles from "./CityList.module.css";
interface Cities {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
}
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
