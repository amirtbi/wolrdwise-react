import React from "react";
import Styles from "./CountryList.module.css";
interface ICity {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
}
export default function CountryList(props: {
  cities: ICity[];
  isLoading: boolean;
}) {
  const { cities, isLoading } = props;

  const countries = cities.reduce(
    (arr: Pick<ICity, "country" | "emoji">[], city: ICity) => {
      if (!arr.map((el: any) => el.country).includes(city.country)) {
        return [...arr, { country: city.country, emoji: city.emoji }];
      } else {
        return arr;
      }
    },
    []
  );
  console.log("countries", countries);

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
      <ul className={Styles.countryList}>
        {countries.map(
          (country: Pick<ICity, "country" | "emoji">, index: number) => (
            <CountryItem key={index} country={country} />
          )
        )}
      </ul>
    </>
  );
}
