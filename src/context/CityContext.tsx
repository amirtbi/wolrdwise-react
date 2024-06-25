import React from "react";
import { createContext } from "react";
import { ICity } from "../model/city.model";
const CityContext = createContext<{
  cities: ICity[];
  currentCity: ICity;
  getCity: (id: string) => void;
  createCity: (city: ICity) => void;
  deleteCity: (id: string) => void;
  isLoading: boolean;
} | null>(null);
const BASE_URL = "http://localhost:3000";

interface IInitialData {
  cities: ICity[];
  currentCity: ICity | undefined;
}
const initialCityData: IInitialData = {
  cities: [],
  currentCity: undefined,
};

function reducer(
  state: typeof initialCityData,
  actions: { type: string; payload?: any }
) {
  switch (actions.type) {
    case "setCities":
      return { ...state, cities: actions.payload };
    case "setCurrentCity":
      return { ...state, currentCity: actions.payload };
    case "deleteCity":
      const updatedCities = state.cities.filter(
        (city) => city.id !== actions.payload
      );
      return { ...state, cities: updatedCities };
    case "createCity":
      const newCities = [...state.cities, actions.payload];
      return { ...state, cities: newCities };
    default:
      throw new Error("Not found any valid type");
  }
}

const CityProvider = (props: { children: JSX.Element | JSX.Element[] }) => {
  const { children } = props;

  const [{ cities, currentCity }, dispatch] = useReducer(
    reducer,
    initialCityData
  );
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchCities = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "setCities", payload: data });
      } catch (e) {
        throw new Error("Something went wrong during fetching data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id: string) {
      debugger;
      if (id === currentCity.id || !currentCity.id) return;
      setIsLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "setCurrentCity", payload: data });
      } catch (e) {
        throw new Error(
          "Something went wrong during fetching current city data"
        );
      } finally {
        setIsLoading(false);
      }
    },
    [currentCity?.id]
  );

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
      dispatch({ type: "createCity", payload: data });
    } catch (e) {
      throw new Error("Something went wrong during creating new city");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id: string) {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "deleteCity", payload: id });
    } catch (e) {
      throw new Error("Something went wrong during deleting city");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        getCity,
        currentCity,
        createCity,
        deleteCity,
      }}
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
