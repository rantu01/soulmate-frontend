import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebaseConfig/firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [jwtToken, setJwtToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Handle auth state change (login/logout)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const res = await fetch(
            "https://matrimony-backend-p3ok.onrender.com/api/login",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ uid: user.uid }),
            }
          );

          const data = await res.json();

          if (res.ok && data.token) {
            setJwtToken(data.token);
            setUserData(data.user); // Store full user data including role and isPremium
          } else {
            console.error("Login error:", data.message);
            setJwtToken(null);
            setUserData(null);
          }
        } catch (err) {
          console.error("Login fetch failed:", err.message);
          setJwtToken(null);
          setUserData(null);
        }
      } else {
        setJwtToken(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Email/password signup and backend register
  async function signup(email, password, name, photoURL) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    try {
      const res = await fetch(
        "https://matrimony-backend-p3ok.onrender.com/api/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uid: cred.user.uid,
            name,
            email,
            photoURL,
          }),
        }
      );

      const data = await res.json();
      if (data.token) setJwtToken(data.token);
    } catch (error) {
      console.error("Register failed:", error.message);
    }

    return cred.user;
  }

  // Firebase email/password login
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Google sign-in and backend register
  async function signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const res = await fetch(
        "https://matrimony-backend-p3ok.onrender.com/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: user.uid,
            name: user.displayName || "Unnamed",
            email: user.email,
            photoURL: user.photoURL || "",
          }),
        }
      );

      const data = await res.json();
      if (res.ok && data.token) {
        setJwtToken(data.token);
      } else {
        console.warn("Google sign-in: no token received or user exists.");
        setJwtToken(null);
      }

      return user;
    } catch (error) {
      console.error("Google sign-in failed:", error.message);
      throw error;
    }
  }

  // Logout
  function logout() {
    setJwtToken(null);
    return signOut(auth);
  }

  const value = {
    currentUser,
    jwtToken,
    loading,
    signup,
    userData,
    login,
    signInWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
