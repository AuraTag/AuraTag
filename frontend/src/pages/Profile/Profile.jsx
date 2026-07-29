import { useEffect, useState } from "react";

import Sidebar from "../../components/Dashboard/Sidebar";
import {
  getProfile,
  updateProfile,
} from "../../services/profileService";

function Profile() {
  const [form, setForm] = useState({
    company_name: "",
    email: "",
    phone: "",
    gst_number: "",
    license_number: "",
    website: "",
    address: "",
    city: "",
    state: "",
    country: "",
    logo_url: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();
      setForm(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = async () => {
    try {
      await updateProfile(form);
      alert("Profile Updated Successfully!");
    } catch (err) {
      console.error(err);
      alert("Update Failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F1117] text-white text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex bg-[#0F1117] min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">

        <h1 className="text-4xl font-bold text-white mb-2">
          Company Profile
        </h1>

        <p className="text-gray-400 mb-8">
          Manage your manufacturer information.
        </p>

        <div className="bg-[#161922] rounded-xl border border-gray-800 p-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="text-gray-300">Company Name</label>

              <input
                className="w-full mt-2 bg-[#1F2330] text-white p-3 rounded-lg outline-none"
                name="company_name"
                value={form.company_name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-gray-300">Email</label>

              <input
                className="w-full mt-2 bg-[#1F2330] text-gray-400 p-3 rounded-lg"
                value={form.email}
                disabled
              />
            </div>

            <div>
              <label className="text-gray-300">Phone</label>

              <input
                className="w-full mt-2 bg-[#1F2330] text-white p-3 rounded-lg"
                name="phone"
                value={form.phone || ""}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-gray-300">GST Number</label>

              <input
                className="w-full mt-2 bg-[#1F2330] text-white p-3 rounded-lg"
                name="gst_number"
                value={form.gst_number || ""}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-gray-300">License Number</label>

              <input
                className="w-full mt-2 bg-[#1F2330] text-white p-3 rounded-lg"
                name="license_number"
                value={form.license_number || ""}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-gray-300">Website</label>

              <input
                className="w-full mt-2 bg-[#1F2330] text-white p-3 rounded-lg"
                name="website"
                value={form.website || ""}
                onChange={handleChange}
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-gray-300">Address</label>

              <input
                className="w-full mt-2 bg-[#1F2330] text-white p-3 rounded-lg"
                name="address"
                value={form.address || ""}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-gray-300">City</label>

              <input
                className="w-full mt-2 bg-[#1F2330] text-white p-3 rounded-lg"
                name="city"
                value={form.city || ""}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-gray-300">State</label>

              <input
                className="w-full mt-2 bg-[#1F2330] text-white p-3 rounded-lg"
                name="state"
                value={form.state || ""}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-gray-300">Country</label>

              <input
                className="w-full mt-2 bg-[#1F2330] text-white p-3 rounded-lg"
                name="country"
                value={form.country || ""}
                onChange={handleChange}
              />
            </div>

          </div>

          <button
            onClick={saveProfile}
            className="mt-8 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-3 rounded-lg transition"
          >
            Save Changes
          </button>

        </div>

      </main>
    </div>
  );
}

export default Profile;