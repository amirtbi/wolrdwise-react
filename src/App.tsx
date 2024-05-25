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
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.component}
                ></Route>
              ))}
              <Route path="*" element={<PageNotFound />}></Route>
            </Routes>
          </BrowserRouter>
        </main>
      </div>
    </>
  );
}

export default App;
