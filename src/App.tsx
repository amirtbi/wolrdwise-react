import React from "react";
import Product from "./pages/Product/Product";
import HomePage from "./pages/Home/Home";
import Pricing from "./pages/Pricing/Pricing";
import PageNotFound from "./pages/PageNotfound";
import AppLayout from "./pages/AppLayout/AppLayout";
import Login from "./pages/Login/Login";
import PageNavs from "./components/PageNavs";
import { BrowserRouter } from "react-router-dom";

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
          <BrowserRouter>
            <Routes>
              <Route index element={<HomePage />}></Route>
              <Route path="/home" element={<HomePage />}></Route>
              <Route path="/product" element={<Product />}></Route>
              <Route path="/pricing" element={<Pricing />}></Route>
              <Route path="/app" element={<AppLayout/>}>
                <Route index element={<p>List of countries</p>}></Route>
                <Route path="cities" element={<p>Cities</p>}></Route>
                <Route path="countries" element={<p>Countries</p>}></Route>
                <Route path="forms" element={<p>Forms</p>}></Route>
              </Route>
              <Route path="/login" element={<Login/>}></Route>
              <Route path="*" element={<PageNotFound />}></Route>
            </Routes>
          </BrowserRouter>
        </main>
      </div>
    </>
  );
}

export default App;
