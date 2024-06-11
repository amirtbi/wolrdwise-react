import { useAuth } from "../context/AuthContext";
import React from "react";
export default function ProtectedRoute(props: { children: JSX.Element }) {
  const authContext = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!authContext?.isAuthenticated) {
      navigate("/login");
    }
  }, []);

  return <>{props.children}</>;
}
