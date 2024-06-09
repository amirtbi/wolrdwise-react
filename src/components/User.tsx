import React from "react";
import { useAuth } from "../context/AuthContext";
import styles from "./User.module.css";
import Button from "./Button";

function User() {
  const authContext = useAuth();
  const navigate = useNavigate();
  function handleClick() {
    authContext?.logout();
    navigate("/login");
  }

  return (
    <div className={styles.user}>
      <img src={authContext?.user?.avatar} alt={authContext?.user?.name} />
      <span>Welcome, {authContext?.user?.name}</span>
      <Button type="primary" onClick={handleClick}>
        Logout
      </Button>
    </div>
  );
}

export default User;

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/
