import styles from "./CountryItem.module.css";
import React from "react";
type counter = {
  countryItem: string;
  emoji: string;
  country: string;
};
function CountryItem(props: counter) {
  const { country, countryItem, emoji } = props;
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
