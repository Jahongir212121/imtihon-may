import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const res = await fetch("https://lavina.onrender.com/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: username,
        email: "joxa@gmail.com",
        key: password,
        secret: "MySecret",
      }),
    });

    const data = await res.json();

    if (data.isOk) {
      localStorage.setItem("user", JSON.stringify(data.data));
      localStorage.setItem("key", data.data.key);
      localStorage.setItem("secret", data.data.secret);
      navigate("/private");
    } else {
      setError("Email yoki password xato");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 w-full max-w-md flex flex-col gap-8 shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign in</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#6200EE] text-white py-2 rounded-md"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Not registered yet?
          <Link to="/" className="text-[#6200EE] hover:underline">
            Go to sign up.
          </Link>
        </p>
      </div>
    </div>
  );
}
