import { useState } from "react";
import { registerBottle } from "../../services/bottleService";

function RegisterBottle() {

    const [form, setForm] = useState({

        bottle_name: "",

        brand: "",

        batch_number: "",

        manufacture_date: "",

        expiry_date: "",

        nfc_uid: "",

        manufacturer_id: 1

    });

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try{

            await registerBottle(form);

            alert("Bottle Registered Successfully");

        }

        catch(err){

            alert("Registration Failed");

        }

    };

    return(

        <div className="min-h-screen bg-[#0F1117] text-white p-10">

            <h1 className="text-4xl font-bold mb-8">

                Register Bottle

            </h1>

            <form
                onSubmit={handleSubmit}
                className="max-w-2xl space-y-6"
            >

                <input
                    name="bottle_name"
                    placeholder="Bottle Name"
                    onChange={handleChange}
                    className="w-full p-4 rounded bg-[#1E2530]"
                />

                <input
                    name="brand"
                    placeholder="Brand"
                    onChange={handleChange}
                    className="w-full p-4 rounded bg-[#1E2530]"
                />

                <input
                    name="batch_number"
                    placeholder="Batch Number"
                    onChange={handleChange}
                    className="w-full p-4 rounded bg-[#1E2530]"
                />

                <input
                    type="date"
                    name="manufacture_date"
                    onChange={handleChange}
                    className="w-full p-4 rounded bg-[#1E2530]"
                />

                <input
                    type="date"
                    name="expiry_date"
                    onChange={handleChange}
                    className="w-full p-4 rounded bg-[#1E2530]"
                />

                <input
                    name="nfc_uid"
                    placeholder="NFC UID"
                    onChange={handleChange}
                    className="w-full p-4 rounded bg-[#1E2530]"
                />

                <button
                    className="bg-[#D6B25E] text-black px-8 py-3 rounded font-semibold"
                >
                    Register Bottle
                </button>

            </form>

        </div>

    );

}

export default RegisterBottle;