import styles from "./CountryItem.module.css";
import React from "react";
type country = {
  emoji: string;
  country: string;
};
function CountryItem(props: { country: country }) {
  const { country } = props;
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
