import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

function Verify() {
  const { uid } = useParams();

  const [loading, setLoading] = useState(true);
  const [bottle, setBottle] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBottle();
  }, []);

  const fetchBottle = async () => {
    try {
      const res = await api.get(`/verify/${uid}`);
      setBottle(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2 className="text-center mt-10">Verifying Bottle...</h2>;
  }

  if (error) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-red-600 text-3xl font-bold">
          ❌ Counterfeit Bottle
        </h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">
        AuraTag Verification
      </h1>

      <div className="text-center mb-6">
        {bottle.is_opened ? (
          <h2 className="text-orange-600 text-2xl font-bold">
            🟠 Already Opened
          </h2>
        ) : (
          <h2 className="text-green-600 text-2xl font-bold">
            ✅ Genuine Product
          </h2>
        )}
      </div>

      <div className="space-y-3">
        <p><strong>Bottle:</strong> {bottle.bottle_name}</p>
        <p><strong>Brand:</strong> {bottle.brand}</p>
        <p><strong>Batch:</strong> {bottle.batch_number}</p>
        <p><strong>Manufactured:</strong> {bottle.manufacture_date}</p>
        <p><strong>Expiry:</strong> {bottle.expiry_date}</p>
        <p><strong>Verification Count:</strong> {bottle.verification_count}</p>
        <p><strong>Last Verified:</strong> {bottle.last_verified}</p>
      </div>

      <div className="mt-8 text-center text-gray-500">
        Protected by AuraTag
      </div>
    </div>
  );
}

export default Verify;