// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import React, { FormEvent } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useCities } from "../context/CityContext";
import styles from "./Form.module.css";
import useUrlLocation from "../hooks/useUrlLocation";
import { ICity } from "../model/city.model";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
export function convertToEmoji(countryCode: any) {
  if (countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char: any) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }
  return "";
}

const initialFormValue = {
  cityName: "",
  country: "",
  emoji: "",
  date: new Date(),
  notes: "",
  error: null,
};

type State = typeof initialFormValue;
function reducer(state: State, actions: { payload?: any; type: string }) {
  const { payload, type } = actions;
  switch (type) {
    case "setCity":
      return { ...state, cityName: payload };
    case "setCountry":
      return { ...state, country: payload };
    case "setEmoji":
      return { ...state, emoji: convertToEmoji(payload) };
    case "setDate":
      return { ...state, date: payload };
    case "setNotes":
      return { ...state, notes: payload };
    case "setGeoCodeError":
      return { ...state, error: payload };
    default:
      throw new Error("Not valid data is found");
  }
}

function Form() {
  const navigate = useNavigate();
  const cityContext = useCities();
  const [{ cityName, country, notes, date, emoji, error }, dispatch] =
    useReducer(reducer, initialFormValue);
  const [mapLang, mapLat] = useUrlLocation();
  const [isLoadingGeoCode, setIsLoadingGeoCode] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newCity: Omit<ICity, "id"> = {
      cityName,
      country,
      position: {
        lng: mapLang,
        lat: mapLat,
      },
      notes,
      date,
      emoji,
    };
    await cityContext?.createCity(newCity);
    navigate("/app");
  };

  useEffect(() => {
    if (!mapLang || !mapLang) return;
    async function fetchCityData() {
      try {
        setIsLoadingGeoCode(true);
        dispatch({ type: "setGeoCodeError", payload: null });
        const res = await fetch(
          `${BASE_URL}?latitude=${mapLat}&longitude=${mapLang}`
        );
        const data = await res.json();
        if (!data.countryCode) {
          throw new Error("Country code not found");
        }
        dispatch({ payload: data.city || data.locality, type: "setCity" });
        console.log("data", data);
        dispatch({ payload: data.countryName, type: "setCountry" });
        dispatch({ type: "setEmoji", payload: data.countryCode });
      } catch (e: any) {
        dispatch({ type: "setGeoCodeError", payload: e.message });
      } finally {
        setIsLoadingGeoCode(false);
      }
    }
    fetchCityData();
  }, [mapLang, mapLat]);

  if (!mapLang && !mapLang) {
    return <Message message="Start by clicking on the Map" />;
  }
  if (error) {
    return <Message message={error} />;
  }
  if (isLoadingGeoCode) {
    return <Spinner />;
  }
  return (
    <form
      className={`${styles.form} ${
        cityContext?.isLoading ? styles.loading : ""
      }`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) =>
            dispatch({ type: "setCity", payload: e.target.value })
          }
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          dateFormat="dd/MM/yyyy"
          selected={date}
          onChange={(startDate: Date) =>
            dispatch({ payload: startDate, type: "setDate" })
          }
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) =>
            dispatch({ type: "setNotes", payload: e.target.value })
          }
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" onClick={() => console.log("s")}>
          Add
        </Button>
        <Button
          type="back"
          onClick={(e: any) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
