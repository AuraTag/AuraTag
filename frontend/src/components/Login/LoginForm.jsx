import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";

function LoginForm() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const data = await login(email, password);

            localStorage.setItem("token", data.token);
            localStorage.setItem("company_name", data.company_name);

            alert("Login Successful");

            navigate("/dashboard");

        } catch (error) {

            alert("Invalid Email or Password");

        }
    };

    return (

        <div className="w-full max-w-md bg-[#1E2530] rounded-2xl p-8 shadow-lg">

            <h1 className="text-3xl font-bold text-white text-center">
                AuraTag
            </h1>

            <p className="text-slate-400 text-center mt-2 mb-8">
                Manufacturer Login
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">

                <div>

                    <label className="block text-slate-300 mb-2">
                        Email
                    </label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Email"
                        className="w-full rounded-lg bg-[#0F1117] border border-slate-700 p-3 text-white"
                    />

                </div>

                <div>

                    <label className="block text-slate-300 mb-2">
                        Password
                    </label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        className="w-full rounded-lg bg-[#0F1117] border border-slate-700 p-3 text-white"
                    />

                </div>

                <button
                    type="submit"
                    className="w-full bg-[#D6B25E] text-black py-3 rounded-lg font-semibold"
                >
                    Login
                </button>

            </form>

        </div>

    );
}

export default LoginForm;