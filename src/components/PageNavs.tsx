import React from "react";
import Styles from "./PageNavs.module.css";
import { useAuth } from "../context/AuthContext";
export default function PageNavs() {
  const authContext = useAuth();
  const navigate = useNavigate();
  const handleRedirect = () => {
    if (authContext?.isAuthenticated) {
      authContext?.logout();
    }
    navigate("/login");
  };
  return (
    <>
      <nav className={Styles["nav"]}>
        <div>
          <Logo />
        </div>
        <ul>
          <Link style={{ padding: "5px" }} to="/product">
            Product
          </Link>
          <Link style={{ padding: "5px" }} to="/pricing">
            Pricing
          </Link>
          <Button type="primary" onClick={handleRedirect}>
            {authContext?.isAuthenticated ? "Logout" : "Login"}
          </Button>
        </ul>
      </nav>
    </>
  );
}
