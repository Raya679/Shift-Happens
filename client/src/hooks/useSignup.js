import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, username, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });

      console.log("Response Status:", response.status);

      const json = await response.json();
      console.log("Response JSON:", json);

      if (!response.ok) {
        throw new Error(json.error || "Sign up failed");
      }

      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
    } catch (error) {
      console.error("Error during signup:", error);
      setError(error.message || "Sign up failed");
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
