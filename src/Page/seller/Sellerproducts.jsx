import React, { useEffect, useState } from 'react';
import Useauth from '../../Component/hook/Useauth';

const Sellerproducts = () => {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const { user } = Useauth();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/all-products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoader(false);
      }
    };
    loadProducts();
  }, []);

  const filtered = products?.filter(p => p.sellerEmail === user?.email);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/all-products/${id}`, {
        method: "DELETE"
      });
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  if (loader) return <p className="text-center text-black mt-10 text-lg">Loading...</p>;

  return (
    <div className="w-full flex justify-center  py-8">
      <div className="w-full max-w-[95%]">
        <h2 className="text-2xl text-green-600 font-bold mb-5">My Products</h2>

        {filtered?.length === 0 ? (
          <p className="text-red-600 text-lg">No products found.</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-green-500 ">
                <th className="p-3 border border-black">Name</th>
                <th className="p-3 border border-black">Category</th>
                <th className="p-3 border border-black">Price</th>
                <th className="p-3 border border-black">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p._id} className="text-center">
                  <td className="p-3 text-black border-black border">{p.name}</td>
                  <td className="p-3 text-black border-black border">{p.category}</td>
                  <td className="p-3 text-black border-black border">${p.price}</td>
                  <td className="p-3 text-black border-black border">
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="px-4 py-1 bg-red-500 text-white rounded"
                    >
                      Delete Product
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Sellerproducts;
