import axios from "axios";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
  UserCredential,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import auth from "./../config/firebase.config";
export const AuthContext = createContext<AuthContextType | null>(null);
interface Props {
  children: ReactNode;
}
interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<null | User>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const googleLogin = async (): Promise<UserCredential> => {
    const googleProvider = new GoogleAuthProvider();
    return await signInWithPopup(auth, googleProvider);
  };

  const emailPasswordRegister = async (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  const emailPasswordLogin = async (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        const user = { email: currentUser.email };
        const { data } = await axios.post(
          `${import.meta.env.VITE_SERVER_API}/auth`,
          user,
          {
            withCredentials: true,
          }
        );
        return data;
      } else {
        const { data } = await axios.post(
          `${import.meta.env.VITE_SERVER_API}/logout`,
          user,
          {
            withCredentials: true,
          }
        );
        return data;
      }
    });
    return () => unSubscribe();
  }, [user]);

  const authInfo = {
    user,
    loading,
    googleLogin,
    emailPasswordRegister,
    emailPasswordLogin,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
