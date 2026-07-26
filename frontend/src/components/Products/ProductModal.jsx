import { useState } from "react";
import { createProduct } from "../../services/productService";

function ProductModal({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    product_name: "",
    brand: "",
    category: "",
    volume: "",
    alcohol_percentage: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    console.log("Sending Product:", formData);

    const response = await createProduct(formData);

    console.log("Success:", response);

    alert("✅ Product Created Successfully");

    onSuccess();
    onClose();

  } catch (err) {
    console.error("Product Error:", err);
    console.error("Response:", err.response);
    console.error("Data:", err.response?.data);

    alert(
      err.response?.data?.error ||
      err.response?.data?.message ||
      err.response?.data?.msg ||
      err.message
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-[#161922] rounded-xl w-[600px] p-8 border border-gray-700">

        <h2 className="text-2xl font-bold text-white mb-6">
          Add Product
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="product_name"
            placeholder="Product Name"
            value={formData.product_name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-[#0F1117] text-white border border-gray-700"
          />

          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={formData.brand}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-[#0F1117] text-white border border-gray-700"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-[#0F1117] text-white border border-gray-700"
          />

          <input
            type="text"
            name="volume"
            placeholder="Volume (750ml)"
            value={formData.volume}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-[#0F1117] text-white border border-gray-700"
          />

          <input
            type="number"
            step="0.1"
            name="alcohol_percentage"
            placeholder="Alcohol Percentage"
            value={formData.alcohol_percentage}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-[#0F1117] text-white border border-gray-700"
          />

          <textarea
            rows="4"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 rounded bg-[#0F1117] text-white border border-gray-700"
          />

          <div className="flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded bg-gray-700 text-white hover:bg-gray-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
            >
              {loading ? "Creating..." : "Create Product"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default ProductModal;