import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router';
import Useauth from '../Component/hook/Useauth';

const Orderpage = () => {
    const servicedata = useLoaderData();
    const { id } = useParams();
    const { user } = Useauth();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate=useNavigate()
    const [selectedDivision, setSelectedDivision] = useState("");
    const [districts, setDistricts] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        zip: "",
        notes: "",
        paymentMethod: "Cash on Delivery",
        division: "",
        district: ""
    });

    useEffect(() => {
        fetch(`https://daily-shop-bd-server.vercel.app/product-detels/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
                setFormData(prev => ({
                    ...prev,
                    name: user?.displayName || "",
                    email: user?.email || ""
                }));
            })
            .catch(() => {
                setLoading(false);
            });
    }, [id, user]);

    const divisions = [...new Set(servicedata.map(r => r.region))];

    const handleDivisionChange = (e) => {
        const selected = e.target.value;
        setSelectedDivision(selected);

        const filterDistricts = servicedata
            .filter(item => item.region === selected)
            .map(item => item.district);

        setDistricts([...new Set(filterDistricts)]);

        setFormData(prev => ({
            ...prev,
            division: selected,
            district: ""
        }));
    };

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        if(!user){
            alert("Login first then you can order these products.");
            return;
        }
        e.preventDefault();

        const order = {
            productId: product._id,
            productName: product.name,
            price: product.price,
            ...formData
        };

        const res = await fetch("https://daily-shop-bd-server.vercel.app/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order)
        });

        const data = await res.json();
        alert("Order Successful!");
        navigate("/products")
    };

    if (loading) return <div className="text-center mt-10 text-black font-bold">Loading...</div>;
    if (!product) return <div className="text-center mt-10 text-red-600 font-bold">Product not found</div>;

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md my-10">
            <h1 className="text-2xl font-bold mb-4 text-black">Order: {product.name}</h1>
            <p className="mb-4 font-semibold text-green-700">Price: ${product.price}</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                <label className="font-semibold text-black">Full Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border-2 border-black px-3 py-2 rounded text-black"
                    required
                />

                <label className="font-semibold text-black">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border-2 border-black px-3 py-2 rounded text-black"
                    required
                />

                <label className="font-semibold text-black">Phone Number</label>
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border-2 border-black px-3 py-2 rounded text-black"
                    required
                />

                <label className="font-semibold text-black">Select Division</label>
                <select
                    value={formData.division}
                    onChange={handleDivisionChange}
                    className="border-2 border-black px-3 py-2 rounded text-black"
                    required
                >
                    <option value="">Choose Division</option>
                    {divisions.map((d, i) => (
                        <option value={d} key={i}>{d}</option>
                    ))}
                </select>

                <label className="font-semibold text-black">Select District</label>
                <select
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className="border-2 border-black px-3 py-2 rounded text-black"
                    required
                >
                    <option value="">Choose District</option>
                    {districts.map((d, i) => (
                        <option value={d} key={i}>{d}</option>
                    ))}
                </select>

                <label className="font-semibold text-black">Zip / Postal Code</label>
                <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    className="border-2 border-black px-3 py-2 rounded text-black"
                />

                <label className="font-semibold text-black">Shipping Address</label>
                <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="border-2 border-black px-3 py-2 rounded text-black"
                    required
                />

                <label className="font-semibold text-black">Additional Notes</label>
                <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    className="border-2 border-black px-3 py-2 rounded text-black"
                />

                <label className="font-semibold text-black">Payment Method</label>
                <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className="border-2 border-black px-3 py-2 rounded text-black"
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
