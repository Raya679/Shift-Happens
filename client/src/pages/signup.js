import { useState, useEffect } from "react";
import { useSignup } from "../hooks/useSignup";
import bg from "../pictures/duplo24.jpeg";
import Navbar from "../components/navbar";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setName] = useState("");
  const { signup, error, isLoading } = useSignup();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, username, password);
    console.log(password, username, email);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="w-full mt-16 max-w-lg p-8 bg-white bg-opacity-90 rounded-lg shadow-2xl shadow-slate-600">
        <h1 className="text-4xl font-bold text-slate-900 mb-2 text-center">
          Shift Happens
        </h1>
        <h2 className="text-xl  text-slate-800 mb-6 text-center">
          User Sign-up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            onChange={(e) => setName(e.target.value)}
            value={username}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <input
            type="email"
            name="email"
            placeholder="example@gmail.com"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 text-white bg-slate-800 hover:bg-gray-700 rounded-lg font-semibold"
          >
            Sign Up
          </button>
          {error && (
            <div className="text-red-500 text-center mt-2">{error}</div>
          )}
          <div className="text-center mt-4 space-y-2">
            <a href="/login" className="text-gray-600 hover:underline">
              Already have an account?
            </a>
            <br />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
