import React, { useEffect, useState } from 'react';
import Useauth from '../Component/hook/Useauth';

const Cart = () => {
  const { user } = Useauth();
  const [carts, setcarts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const getCart = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://daily-shop-bd-server.vercel.app/cart");
        const data = await res.json();
        const filterdata = data.filter(d => d.userEmail === user.email);
        setcarts(filterdata);
      } finally {
        setLoading(false);
      }
    };

    getCart();
  }, [user]);




const handeldelete = async (id) => {
  console.log("Deleting ID:", id);  
  try {
    const res = await fetch(`https://daily-shop-bd-server.vercel.app/cart/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    console.log("Server response:", data);

    if (!res.ok) throw new Error(data.message || "Failed to delete cart item");

    setcarts(carts.filter(o => o._id.toString() !== id.toString()));
  } catch (err) {
    console.log(err.message);
  }
}



  if (loading) return <div className="text-center mt-10 text-green-800 font-bold">Loading...</div>;
  if (!carts || carts.length === 0) return <div className="text-center mt-10 text-green-800 font-bold">Your cart is empty!</div>;

  return (
    <div className="max-w-[95%] w-full mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Your Cart</h1>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full w-full bg-white rounded-xl shadow-lg">
          <thead className="bg-green-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Product</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Brand</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {carts.map((product, index) => (
              <tr key={product._id} className="hover:bg-green-50">
                <td className="py-3 px-4 text-black">{index + 1}</td>
                <td className="py-3 px-4">
                  <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-lg" />
                </td>
                <td className="py-3 px-4 font-semibold text-green-800">{product.name}</td>
                <td className="py-3 px-4 font-bold text-green-700">${product.price}</td>
                <td className="py-3 px-4 text-gray-600">{product.brand || "Unknown Brand"}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handeldelete(product._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
