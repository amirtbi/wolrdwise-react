import React from "react";
import Styles from "./CityList.module.css";
interface Cities {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
}
export default function CityList(props: {
  cities: Cities[];
  isLoading: boolean;
}) {
  const { cities, isLoading } = props;

  if (isLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  return (
    <>
      <ul className={Styles.cityList}>
        {cities.map((city, index) => (
          <CityItem city={city} key={index} />
        ))}
      </ul>
    </>
  );
}
