import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Useauth from '../Component/hook/Useauth';

const Orderpage = () => {
    const { id } = useParams();
    const { user } = Useauth();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zip: '',
        notes: '',
        paymentMethod: 'Cash on Delivery'
    });

    useEffect(() => {
        fetch(`http://localhost:3000/product-detels/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
                setFormData(prev => ({
                    ...prev,
                    name: user?.displayName || '',
                    email: user?.email || ''
                }));
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id, user]);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const order = {
            productId: product._id,
            productName: product.name,
            price: product.price,
            ...formData
        };

        fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order)
        })
        .then(res => res.json())
        .then(data => {
            alert('Order placed successfully!');
        })
        .catch(err => {
            console.error(err);
            alert('Failed to place order.');
        });
    }

    if (loading) return <div className="text-center mt-10 text-black font-bold">Loading...</div>;
    if (!product) return <div className="text-center mt-10 text-red-600 font-bold">Product not found</div>;

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md my-10">
            <h1 className="text-2xl font-bold mb-4 text-black">Order: {product.name}</h1>
            <p className="mb-4 font-semibold text-green-700">Price: ${product.price}</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    defaultValue={formData.name}
                    onChange={handleChange}
                    className="border-2 border-black px-3 py-2 rounded text-black placeholder-gray-400 font-semibold"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    defaultValue={formData.email}
                    onChange={handleChange}
                    className="border-2 border-black px-3 py-2 rounded text-black placeholder-gray-400 font-semibold"
                    required
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    defaultValue={formData.phone}
                    onChange={handleChange}
                    className="border-2 border-black px-3 py-2 rounded text-black placeholder-gray-400 font-semibold"
                    required
                />
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    defaultValue={formData.city}
                    onChange={handleChange}
                    className="border-2 border-black px-3 py-2 rounded text-black placeholder-gray-400 font-semibold"
                />
                <input
                    type="text"
                    name="zip"
                    placeholder="Zip / Postal Code"
                    defaultValue={formData.zip}
                    onChange={handleChange}
                    className="border-2 border-black px-3 py-2 rounded text-black placeholder-gray-400 font-semibold"
                />
                <textarea
                    name="address"
                    placeholder="Shipping Address"
                    defaultValue={formData.address}
                    onChange={handleChange}
                    className="border-2 border-black px-3 py-2 rounded text-black placeholder-gray-400 font-semibold"
                    required
                />
                <textarea
                    name="notes"
                    placeholder="Additional Notes"
                    defaultValue={formData.notes}
                    onChange={handleChange}
                    className="border-2 border-black px-3 py-2 rounded text-black placeholder-gray-400 font-semibold"
                />
                <select
                    name="paymentMethod"
                    defaultValue={formData.paymentMethod}
                    onChange={handleChange}
                    className="border-2 border-black px-3 py-2 rounded text-black placeholder-gray-400 font-semibold"
                >
                    <option value="Cash on Delivery">Cash on Delivery</option>
                    <option value="Bkash">Bkash</option>
                    <option value="Rocket">Rocket</option>
                    <option value="Online Payment">Online Payment</option>
                </select>
                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-bold"
                >
                    Place Order
                </button>
            </form>
        </div>
    );
};

export default Orderpage;
