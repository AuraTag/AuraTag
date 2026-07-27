import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { verifyBottle } from "../../services/verifyService";

function Verify() {
  const { uid } = useParams();

  const [bottle, setBottle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBottle();
  }, []);

  const loadBottle = async () => {
    try {
      const data = await verifyBottle(uid);
      setBottle(data);
    } catch (err) {
      console.error(err);
      setBottle(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Loading...
      </div>
    );
  }

  if (!bottle) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-3xl font-bold">
        ❌ Bottle Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white rounded-xl shadow-xl p-8 w-[600px]">

        <h1 className="text-4xl font-bold text-green-600 mb-6 text-center">
          ✔ Genuine Product
        </h1>

        <div className="space-y-3">

          <p><b>Bottle :</b> {bottle.bottle_name}</p>

          <p><b>Brand :</b> {bottle.brand}</p>

          <p><b>Batch :</b> {bottle.batch_number}</p>

          <p><b>Manufactured :</b> {bottle.manufacture_date}</p>

          <p><b>Expiry :</b> {bottle.expiry_date}</p>

          <p>
            <b>Status :</b>{" "}
            {bottle.is_opened
              ? "🟠 Already Opened"
              : "🟢 Factory Sealed"}
          </p>

          <p>
            <b>Verification Count :</b>{" "}
            {bottle.verification_count}
          </p>

          <p>
            <b>Last Verified :</b>{" "}
            {bottle.last_verified}
          </p>

        </div>

      </div>

    </div>
  );
}

export default Verify;