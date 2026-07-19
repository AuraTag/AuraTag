import { useState } from "react";
function LoginForm() {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

  return (
    <div className="w-full max-w-md bg-[#1E2530] rounded-2xl p-8 shadow-lg">

      <h1 className="text-3xl font-bold text-white text-center">
        AuraTag
      </h1>

      <p className="text-slate-400 text-center mt-2 mb-8">
        Manufacturer Login
      </p>

      <form className="space-y-5">

        <div>
          <label className="block text-slate-300 mb-2">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-lg bg-[#0F1117] border border-slate-700 p-3 text-white focus:outline-none focus:border-[#D6B25E]"
          />
        </div>

        <div>
          <label className="block text-slate-300 mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full rounded-lg bg-[#0F1117] border border-slate-700 p-3 text-white focus:outline-none focus:border-[#D6B25E]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#D6B25E] text-black font-semibold py-3 rounded-lg hover:bg-[#E5C97A] transition"
        >
          Login
        </button>

      </form>

    </div>
  );
}


export default LoginForm;