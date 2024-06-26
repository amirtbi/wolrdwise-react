import React from "react";
import Product from "./pages/Product/Product";
import HomePage from "./pages/Home/Home";
import Pricing from "./pages/Pricing/Pricing";
import PageNotFound from "./pages/PageNotfound";
import AppLayout from "./pages/AppLayout/AppLayout";
import Login from "./pages/Login/Login";
import User from "./components/User";
import PageNavs from "./components/PageNavs";
import { BrowserRouter as Router } from "react-router-dom";
import CountryList from "./components/CountryList";
import { CityProvider } from "./context/CityContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
const routes = [
  { path: "/", component: <HomePage /> },
  { path: "/home", component: <HomePage /> },
  { path: "/product", component: <Product /> },
  { path: "/pricing", component: <Pricing /> },
  { path: "/app", component: <AppLayout /> },
  { path: "/login", component: <Login /> },
];
function App() {
  return (
    <>
      <div>
        <main>
          <AuthProvider>
            <CityProvider>
              <Router>
                <Routes>
                  <Route index element={<HomePage />}></Route>
                  <Route path="/home" element={<HomePage />}></Route>
                  <Route path="/product" element={<Product />}></Route>
                  <Route path="/pricing" element={<Pricing />}></Route>
                  <Route
                    path="/app"
                    element={
                      <ProtectedRoute>
                        <AppLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route
                      index
                      element={<Navigate replace to="cities" />}
                    ></Route>
                    <Route path="cities" element={<CityList />}></Route>
                    <Route path="countries" element={<CountryList />}></Route>
                    <Route path="cities/:id" element={<City />}></Route>
                    <Route path="form" element={<Form />}></Route>
                  </Route>
                  <Route path="/login" element={<Login />}></Route>
                  <Route path="*" element={<PageNotFound />}></Route>
                </Routes>
              </Router>
            </CityProvider>
          </AuthProvider>
        </main>
      </div>
    </>
  );
}

export default App;
