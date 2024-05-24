import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import HomePage from "./pages/HomePage";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotfound";
import PageNavs from "./components/PageNavs";

const routes = [
  { path: "/", component: <HomePage /> },
  { path: "home", component: <HomePage /> },
  { path: "product", component: <Product /> },
  { path: "pricing", component: <Pricing /> },
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
