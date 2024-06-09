import React from "react";
import Styles from "./CityItem.module.css";
import { useCities } from "../context/CityContext";
import { ICity } from "../model/city.model";
interface City {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  id?: string;
  position?: { lat: number; lng: number };
}

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

export default function CityItem(props: { city: ICity }) {
  const cityContext = useCities();
  const { city } = props;
  const { lat, lng } = city.position as { lat: number; lng: number };

  const handleDeletion = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (city.id) await cityContext?.deleteCity(city.id);
  };
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
          <time className={Styles.date}>
            {formatDate(city.date.toString())}
          </time>
          <button onClick={handleDeletion} className={Styles.deleteBtn}>
            &times;
          </button>
        </Link>
      </li>
    </>
  );
}
