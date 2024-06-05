import React from "react";
import { createContext } from "react";
import { ICity } from "../model/city.model";
const CityContext = createContext<{
  cities: {
    cityName: string;
    country: string;
    emoji: string;
    date: Date;
    notes: string;
  }[];
  currentCity: ICity | undefined;
  getCity: (id: number) => void;
  createCity: (city: ICity) => void;
  isLoading: boolean;
} | null>(null);
const BASE_URL = "http://localhost:3000";

const CityProvider = (props: { children: JSX.Element | JSX.Element[] }) => {
  const { children } = props;

  const [cities, setCities] = useState<ICity[]>([]);
  const [currentCity, setCurrentCity] = useState<ICity | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchCities = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (e) {
        throw new Error("Something went wrong during fetching data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  async function getCity(id: number) {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(() => data);
    } catch (e) {
      throw new Error("Something went wrong during fetching current city data");
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity: Omit<ICity, "id">) {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setCities((prevCities) => [...prevCities, data]);
    } catch (e) {
      throw new Error("Something went wrong during creating new city");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CityContext.Provider
      value={{ cities, isLoading, getCity, currentCity, createCity }}
    >
      {children}
    </CityContext.Provider>
  );
};

const useCities = () => {
  const context = useContext(CityContext);
  if (context === undefined)
    throw new Error("Cities context are not provided!");
  return context;
};
export { CityProvider, useCities };
