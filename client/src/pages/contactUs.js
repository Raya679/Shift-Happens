import { useState, useEffect } from "react";
import bg from "../pictures/duplo24.jpeg";
import Navbar from "../components/navbar";

const Contact = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Submit Details");
  };

  return (
    <div>
      <Navbar />

      <div
        className="fixed inset-0 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="w-full mt-16 max-w-lg p-8 bg-white bg-opacity-90 rounded-lg shadow-2xl shadow-slate-600">
          <h1 className="text-4xl font-bold  text-slate-900  mb-6 text-center">
            Contact Us
          </h1>
          <form method="post" onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              onChange={handleChange}
              value={data.name}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              onChange={handleChange}
              value={data.email}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <input
              type="tel"
              name="phone"
              placeholder="+91"
              onChange={handleChange}
              value={data.phone}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              onChange={handleChange}
              value={data.message}
              className="w-full p-3 ml-0 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 h-32 resize-none"
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 text-white bg-slate-800 hover:bg-gray-700 rounded-lg font-semibold"
            >
              Send Your Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
