import React from "react";
import Product from "./pages/Product/Product";
import HomePage from "./pages/Home/Home";
import Pricing from "./pages/Pricing/Pricing";
import PageNotFound from "./pages/PageNotfound";
import AppLayout from "./pages/AppLayout/AppLayout";
import Login from "./pages/Login/Login";
import PageNavs from "./components/PageNavs";
import { BrowserRouter } from "react-router-dom";
import CountryList from "./components/CountryList";

const routes = [
  { path: "/", component: <HomePage /> },
  { path: "/home", component: <HomePage /> },
  { path: "/product", component: <Product /> },
  { path: "/pricing", component: <Pricing /> },
  { path: "/app", component: <AppLayout /> },
  { path: "/login", component: <Login /> },
];
const BASE_URL = "http://localhost:3000";
function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
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
  return (
    <>
      <div>
        <main>
          <BrowserRouter>
            <Routes>
              <Route index element={<HomePage />}></Route>
              <Route path="/home" element={<HomePage />}></Route>
              <Route path="/product" element={<Product />}></Route>
              <Route path="/pricing" element={<Pricing />}></Route>
              <Route path="/app" element={<AppLayout />}>
                <Route index element={<Navigate replace to="cities" />}></Route>
                <Route
                  path="cities"
                  element={<CityList isLoading={isLoading} cities={cities} />}
                ></Route>
                <Route
                  path="countries"
                  element={
                    <CountryList isLoading={isLoading} cities={cities} />
                  }
                ></Route>
                <Route path="cities/:id" element={<City />}></Route>
                <Route path="form" element={<Form />}></Route>
              </Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="*" element={<PageNotFound />}></Route>
            </Routes>
          </BrowserRouter>
        </main>
      </div>
    </>
  );
}

export default App;
