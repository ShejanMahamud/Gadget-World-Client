import { useContext } from "react";
import { AuthContext } from "../services/AuthProvider";

const useAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("Auth Context is Not Available!");
  }
  return auth;
};

export default useAuth;
