import { User } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../services/AuthProvider";
interface AuthContextType {
  user: User | null;
  loading: boolean;
}
const useAuth = (): AuthContextType | null => {
  const auth = useContext(AuthContext);

  return auth;
};

export default useAuth;
