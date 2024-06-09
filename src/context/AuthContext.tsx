import React from "react";
import { createContext } from "react";
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

interface IAuthContext {
  logout: () => void;
  login: (email: string, password: any) => void;
  isAuthenticated: boolean;
  user: typeof FAKE_USER;
}
const initialAuthVal = {
  user: null,
  isAuthenticated: false,
};
const AuthContext = createContext<IAuthContext | null>(null);

type State = typeof initialAuthVal;
type Action = { payload?: any; type: string };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "login":
      return { user: action.payload, isAuthenticated: true };
    case "logout":
      return { user: null, isAuthenticated: false };
    default:
      throw new Error("");
  }
};

function AuthProvider(props: { children: JSX.Element | JSX.Element[] }) {
  const { children } = props;
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialAuthVal
  );

  function login(email: string, password: string) {
    if (email === FAKE_USER.email && password === FAKE_USER.password);
    dispatch({ type: "login", payload: FAKE_USER });
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("Not valid context found!");
  return context;
}

export { useAuth, AuthProvider };
