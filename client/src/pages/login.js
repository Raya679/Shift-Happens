import { useState, useEffect } from "react";
import { useLogin } from "../hooks/useLogin";
import bg from "../pictures/duplo24.jpeg";
import Navbar from "../components/navbar";

const Login = () => {
  const [password, setPassword] = useState("");
  const [username, setName] = useState("");
  const { login, error, isLoading } = useLogin();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
    console.log(password, username);
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
        <h2 className="text-xl  text-slate-800 mb-6 text-center">User Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-900 font-semibold mb-1">
              Username:
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div>
            <label className="block text-slate-900 font-semibold mb-1">
              Password:
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 text-white bg-slate-800 hover:bg-gray-700 rounded-lg font-semibold"
          >
            Submit
          </button>
          {error && (
            <div className="text-red-500 text-center mt-2">{error}</div>
          )}
          <div className="text-center mt-4">
            <a href="/signup" className="text-gray-600 hover:underline">
              Don't have an account?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
