import React, { useEffect, useState } from 'react';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/products")
            .then(res => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            })
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p className='flex justify-center items-center text-4xl font-bold'>Loading products...</p>;
    if (error) return <p className='text-red-600 text-center mt-4'>Error: {error}</p>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className='lg:max-w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {products.map(product => (
                    <div 
                        key={product.id} 
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
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
