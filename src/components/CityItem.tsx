import React from "react";
import Styles from "./CityItem.module.css";
import { useCities } from "../context/CityContext";
interface City {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  id?: number;
  position?: { lat: number; lng: number };
}

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

export default function CityItem(props: { city: City }) {
  const cityContext = useCities();
  const { city } = props;
  const { lat, lng } = city.position as { lat: number; lng: number };
  console.log("city", city);
  return (
    <>
      <li>
        <Link
          to={`${city.id}?lat=${lat}&long=${lng}`}
          className={`${Styles.cityItem} ${
            city.id === cityContext?.currentCity?.id
              ? Styles["cityItem--active"]
              : ""
          }`}
        >
          <span className={Styles.emoji}>{city.emoji}</span>
          <h3 className={Styles.name}>{city.cityName}</h3>
          <time className={Styles.date}>{formatDate(city.date)}</time>
          <button className={Styles.deleteBtn}>&times;</button>
        </Link>
      </li>
    </>
  );
}
