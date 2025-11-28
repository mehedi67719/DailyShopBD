import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate=useNavigate()

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3000/products?search=${searchTerm}`)
            .then(res => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            })
            .then(data => {
                setProducts(data);
                setLoading(false);
                setError(null);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [searchTerm]);

// console.log(products)

    const handelproductclick=(productid)=>{
        navigate(`/productdetels/${productid}`)
    }


    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="lg:max-w-[90%] mx-auto">
                <div className="flex flex-col justify-center items-center gap-4 mb-6">
                    <h1 className="text-3xl font-extrabold text-gray-900">Our Products</h1>
                    <div className="sm:w-1/3 w-full">
                        <input
                            type="search"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full border-2 border-black text-black px-4 py-2 rounded-lg"
                        />
                    </div>
                </div>

                {loading && (
                    <p className='flex justify-center items-center text-black text-2xl font-bold'>
                        Loading products...
                    </p>
                )}

                {error && (
                    <p className='text-red-600 text-center mt-4'>
                        Error: {error}
                    </p>
                )}

                {!loading && !error && products.length === 0 && (
                    <p className="text-center text-gray-600">No products found.</p>
                )}

                {!loading && !error && products.length > 0 && (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                        {products.map(product => (
                            <button
                            onClick={()=>handelproductclick(product._id)}
                                key={product._id}
                                className="bg-white border rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-56 object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
                                    <p className="text-green-600 font-semibold mt-2">${product.price}</p>
                                    <p className="text-gray-600 text-sm mt-2">{product.shortDescription}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {!loading && !error && products.length > 0 && (
                    <div className="flex justify-center mt-6">
                        <button className='px-6 py-2 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition'>
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
