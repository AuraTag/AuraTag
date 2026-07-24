import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerBottle } from "../../services/bottleService";

function RegisterBottle() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        bottle_name: "",
        brand: "",
        batch_number: "",
        manufacture_date: "",
        expiry_date: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Button Clicked");
        console.log(form);

        try {
            console.log("Calling API...");

            const response = await registerBottle(form);

            console.log(response);

            alert(
                `Bottle Registered Successfully!\n\nNFC UID:\n${response.nfc_uid}`
            );

            setForm({
                bottle_name: "",
                brand: "",
                batch_number: "",
                manufacture_date: "",
                expiry_date: ""
            });

            navigate("/dashboard");

        } catch (err) {
            console.log("ERROR:", err);
            console.log("RESPONSE:", err.response);
            console.log("DATA:", err.response?.data);

            alert(
                err.response?.data?.message ||
                err.response?.data?.error ||
                err.response?.data?.msg ||
                err.message
            );
        }
    };

    return (
        <div className="min-h-screen bg-[#0F1117] text-white p-10">

            <h1 className="text-4xl font-bold mb-8">
                Register Bottle
            </h1>

            <form
                onSubmit={handleSubmit}
                className="max-w-2xl space-y-6"
            >

                <input
                    type="text"
                    name="bottle_name"
                    value={form.bottle_name}
                    onChange={handleChange}
                    placeholder="Bottle Name"
                    className="w-full p-4 rounded bg-[#1E2530] border border-slate-700"
                    required
                />

                <input
                    type="text"
                    name="brand"
                    value={form.brand}
                    onChange={handleChange}
                    placeholder="Brand"
                    className="w-full p-4 rounded bg-[#1E2530] border border-slate-700"
                    required
                />

                <input
                    type="text"
                    name="batch_number"
                    value={form.batch_number}
                    onChange={handleChange}
                    placeholder="Batch Number"
                    className="w-full p-4 rounded bg-[#1E2530] border border-slate-700"
                    required
                />

                <input
                    type="date"
                    name="manufacture_date"
                    value={form.manufacture_date}
                    onChange={handleChange}
                    className="w-full p-4 rounded bg-[#1E2530] border border-slate-700"
                    required
                />

                <input
                    type="date"
                    name="expiry_date"
                    value={form.expiry_date}
                    onChange={handleChange}
                    className="w-full p-4 rounded bg-[#1E2530] border border-slate-700"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-[#D6B25E] hover:bg-[#E5C97A] text-black py-3 rounded-lg font-semibold transition"
                >
                    Register Bottle
                </button>

            </form>

        </div>
    );
}

export default RegisterBottle;
