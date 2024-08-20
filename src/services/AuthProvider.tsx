import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import auth from "./../config/firebase.config";

// Define the AuthContext type with all methods returning promises
interface AuthContextType {
  user: User | null;
  loading: boolean;
  googleLogin: () => Promise<UserCredential>;
  emailPasswordRegister: (
    email: string,
    password: string
  ) => Promise<UserCredential>;
  emailPasswordLogin: (
    email: string,
    password: string
  ) => Promise<UserCredential>;
  logOut: () => Promise<void>;
}

// Create context with a default value of null
export const AuthContext = createContext<AuthContextType | null>(null);

interface Props {
  children: ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
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

  const logOut = async (): Promise<void> => {
    return await signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unSubscribe();
  }, []);

  const authInfo: AuthContextType = {
    user,
    loading,
    googleLogin,
    emailPasswordRegister,
    emailPasswordLogin,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
      <Toaster />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
