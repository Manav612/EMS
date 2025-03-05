import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ name, email, password });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-[#A67B5B] to-[#5C4033]">
      <div className="bg-[#FAF9F6] p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#5C4033] mb-6">
          Create an Account
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-[#A67B5B] p-3 rounded-lg bg-transparent text-[#5C4033] placeholder-[#8B6F47] focus:ring-2 focus:ring-[#A67B5B] outline-none w-full"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-[#A67B5B] p-3 rounded-lg bg-transparent text-[#5C4033] placeholder-[#8B6F47] focus:ring-2 focus:ring-[#A67B5B] outline-none w-full"
            required
          />
          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-[#A67B5B] p-3 rounded-lg bg-transparent text-[#5C4033] placeholder-[#8B6F47] focus:ring-2 focus:ring-[#A67B5B] outline-none w-full"
            required
          />
          <button
            type="submit"
            className="bg-[#A67B5B] text-[#FAF9F6] p-3 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-[#8B6F47] hover:scale-105 w-full"
          >
            Register
          </button>
        </form>

        <p className="text-center text-[#5C4033] mt-6 text-sm sm:text-base">
          Already have an account?{" "}
          <a href="/login" className="text-[#8B6F47] font-semibold underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
