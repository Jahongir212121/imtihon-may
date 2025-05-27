import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwordlar bir hil emasdur");
      return;
    }

    const res = await fetch("https://lavina.onrender.com/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        email: username + "@gmail.com",
        key: password,
        secret: "my-secret",
      }),
    });

    const data = await res.json();

    console.log(data);

    if (data.isOk) {
      localStorage.setItem("user", JSON.stringify(data.data));
      localStorage.setItem("key", data.data.key);
      localStorage.setItem("secret", data.data.secret);
      navigate("/private");
    } else {
      setError("Registrationda hatolik");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 w-full max-w-md flex flex-col gap-8 shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign up</h2>
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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#6200EE] text-white py-2 rounded-md"
          >
            Register
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Already signed up?
          <Link to="/login" className="text-[#6200EE] hover:underline">
            Go to sign in.
          </Link>
        </p>
      </div>
    </div>
  );
}
