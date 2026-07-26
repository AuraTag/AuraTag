import { useEffect, useState } from "react";
import { createBatch } from "../../services/batchService";
import { getProducts } from "../../services/productService";

function BatchModal({ onClose, onSuccess }) {
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    product_id: "",
    batch_number: "",
    quantity: "",
    manufacture_date: "",
    expiry_date: "",
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
  try {
    const data = await getProducts();

    console.log("Products API:", data);

    setProducts(data);
  } catch (error) {
    console.error("Products Error:", error);
  }
};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("Submitting:", formData);

  if (!formData.product_id) {
    alert("Product is not selected.");
    return;
  }

  try {
    const response = await createBatch({
      product_id: Number(formData.product_id),
      batch_number: formData.batch_number,
      quantity: Number(formData.quantity),
      manufacture_date: formData.manufacture_date,
      expiry_date: formData.expiry_date,
    });

    console.log(response);
    alert("Batch created successfully!");

    onSuccess();
    onClose();

  } catch (error) {
    console.error(error);

    if (error.response) {
      alert(JSON.stringify(error.response.data));
    } else {
      alert("Server Error");
    }
  }
};

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center">

      <div className="bg-[#161B22] w-[550px] rounded-xl p-8">

        <h2 className="text-2xl font-bold text-[#D6B25E] mb-6">
          Generate Batch
        </h2>

        <form
  noValidate
  onSubmit={handleSubmit}
  className="space-y-4"
>

      <select
  name="product_id"
  value={formData.product_id}
  onChange={(e) => {
    console.log("Selected:", e.target.value);

    setFormData((prev) => ({
      ...prev,
      product_id: e.target.value,
    }));
  }}
  className="w-full p-3 rounded bg-[#0D1117] border border-gray-700"
>
  <option value="">Select Product</option>

  {products.map((product) => (
    <option
      key={product.id}
      value={product.id}
    >
      {product.product_name}
    </option>
  ))}
</select>

          <input
            type="text"
            name="batch_number"
            placeholder="Batch Number"
            value={formData.batch_number}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-[#0D1117] border border-gray-700"
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-[#0D1117] border border-gray-700"
          />

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="text-sm text-gray-400">
                Manufacture Date
              </label>

              <input
                type="date"
                name="manufacture_date"
                value={formData.manufacture_date}
                onChange={handleChange}
                required
                className="w-full mt-2 p-3 rounded bg-[#0D1117] border border-gray-700"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">
                Expiry Date
              </label>

              <input
                type="date"
                name="expiry_date"
                value={formData.expiry_date}
                onChange={handleChange}
                required
                className="w-full mt-2 p-3 rounded bg-[#0D1117] border border-gray-700"
              />
            </div>

          </div>

          <div className="flex justify-end gap-4 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded bg-gray-600 hover:bg-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded bg-[#D6B25E] text-black hover:opacity-90"
            >
              Generate Batch
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default BatchModal;