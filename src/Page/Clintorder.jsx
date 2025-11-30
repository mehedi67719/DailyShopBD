import React, { useEffect, useState } from 'react';
import Useauth from '../Component/hook/Useauth';

const Clintorder = () => {
    const { user } = Useauth();
    const [orders, setOrders] = useState([]);
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) return;

        const fetchOrders = async () => {
            try {
                setLoader(true);
                const res = await fetch("http://localhost:3000/clint-order");
                if (!res.ok) throw new Error("Failed to fetch orders");
                const data = await res.json();
                const filterdata = data.filter(d => d.email.toString() === user.email.toString());
                setOrders(filterdata);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoader(false);
            }
        };
        fetchOrders();
    }, [user]);

    const totalAmount = orders.reduce((sum, item) => sum + Number(item.price), 0);

    const handeldelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/clint-order/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete order");
            const data = await res.json();
            setOrders(orders.filter(o => o._id.toString() !== id.toString()));
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Client Orders</h2>
                <div className="bg-green-600 text-white px-4 py-2 rounded shadow-lg">
                    <p className="text-lg font-semibold">
                        Total Amount: ${totalAmount.toFixed(2)}
                    </p>
                </div>
            </div>

            {loader ? (
                <p className="text-center mt-10">Loading...</p>
            ) : error ? (
                <p className="text-center mt-10 text-red-500 text-xl font-semibold">{error}</p>
            ) : orders.length === 0 ? (
                <p className="text-center mt-10 text-red-500 text-xl font-semibold">No Orders Found</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-green-600 text-white">
                                <th className="border p-2">#</th>
                                <th className="border p-2">Product Name</th>
                                <th className="border p-2">Price</th>
                                <th className="border p-2">Client Name</th>
                                <th className="border p-2">Email</th>
                                <th className="border p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={order._id} className="text-center">
                                    <td className="border p-2">{index + 1}</td>
                                    <td className="border p-2">{order.productName}</td>
                                    <td className="border p-2">${order.price}</td>
                                    <td className="border p-2">{order.name}</td>
                                    <td className="border p-2">{order.email}</td>
                                    <td className="border p-2">
                                        <button
                                            className="px-3 py-1 bg-red-500 hover:bg-red-700 text-white rounded"
                                            onClick={() => handeldelete(order._id)}
                                        >
                                            Cancel Order
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Clintorder;
