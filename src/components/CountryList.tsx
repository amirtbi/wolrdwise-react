import React from "react";
import Styles from "./CountryList.module.css";
interface ICity {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
}
export default function CountryList() {
  const cityContextVal = useCities();

  const countries = cityContextVal!.cities.reduce(
    (arr: Pick<ICity, "country" | "emoji">[], city: ICity) => {
      if (!arr.map((el: any) => el.country).includes(city.country)) {
        return [...arr, { country: city.country, emoji: city.emoji }];
      } else {
        return arr;
      }
    },
    []
  );

  if (cityContextVal!.isLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }
  if (!cityContextVal!.cities.length)
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
