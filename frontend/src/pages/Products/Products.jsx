import { useEffect, useState } from "react";
import Sidebar from "../../components/Dashboard/Sidebar";
import ProductModal from "../../components/Products/ProductModal";
import { getProducts } from "../../services/productService";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      console.error("Failed to load products:", err);
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.product_name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredProducts(filtered);
  }, [search, products]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0F1117] text-white">
        Loading Products...
      </div>
    );
  }

  return (
    <div className="flex bg-[#0F1117] min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">
              Products
            </h1>

            <p className="text-gray-400 mt-2">
              Manage all your products.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-yellow-500 hover:bg-yellow-600 px-5 py-3 rounded-lg font-semibold text-black"
          >
            + Add Product
          </button>
        </div>

        <input
          type="text"
          placeholder="Search Product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-6 p-3 rounded-lg bg-[#161922] border border-gray-700 text-white"
        />

        <div className="bg-[#161922] rounded-xl border border-gray-800 overflow-hidden">

          <table className="w-full">

            <thead className="bg-[#1F2330]">

              <tr>

                <th className="p-4 text-left text-gray-300">
                  Product
                </th>

                <th className="p-4 text-left text-gray-300">
                  Brand
                </th>

                <th className="p-4 text-left text-gray-300">
                  Category
                </th>

                <th className="p-4 text-left text-gray-300">
                  Volume
                </th>

                <th className="p-4 text-left text-gray-300">
                  Alcohol %
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredProducts.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center text-gray-500 p-8"
                  >
                    No Products Found
                  </td>

                </tr>

              ) : (

                filteredProducts.map((product) => (

                  <tr
                    key={product.id}
                    className="border-t border-gray-800 hover:bg-[#1F2330]"
                  >

                    <td className="p-4 text-white">
                      {product.product_name}
                    </td>

                    <td className="p-4 text-gray-300">
                      {product.brand}
                    </td>

                    <td className="p-4 text-gray-300">
                      {product.category}
                    </td>

                    <td className="p-4 text-gray-300">
                      {product.volume}
                    </td>

                    <td className="p-4 text-gray-300">
                      {product.alcohol_percentage}%
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </main>

      {showModal && (
        <ProductModal
          onClose={() => setShowModal(false)}
          onSuccess={loadProducts}
        />
      )}

    </div>
  );
}

export default Products;