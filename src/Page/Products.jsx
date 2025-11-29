import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Useauth from '../Component/hook/Useauth';

const Products = () => {
    const { user } = Useauth();
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3000/products?search=${searchTerm}&page=${page}&limit=8`)
            .then(res => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            })
            .then(data => {
                if (page === 1) {
                    setProducts(data.products);
                } else {
                    setProducts(prev => [...prev, ...data.products]);
                }
                setHasMore(page < data.totalpages);
                setLoading(false);
                setError(null);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [searchTerm, page]);

    const handleProductClick = (productId) => {
        navigate(`/productdetels/${productId}`);
    }

    const handelAddToCart = (productId, e) => {
        e.stopPropagation();
        const filterproduct = products.find(p => p._id.toString() === productId.toString());

        const data={
            ...filterproduct,
            userEmail:user.email
        };
        
        fetch("http://localhost:3000/cart",{
            method:"POST",
            headers:{
                 'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(Response=>{
            console.log("added to card",Response);
            alert('Product added to cart successfully!');
        })
        .catch(err => {
        console.error('Error adding to cart:', err);
        alert('Failed to add product to cart.');
          });


        
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
                            <div
                                key={product._id}
                                onClick={() => handleProductClick(product._id)}
                                className="bg-white border rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl flex flex-col cursor-pointer"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-56 object-cover"
                                />
                                <div className="p-4 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
                                        <p className="text-green-600 font-semibold mt-2">${product.price}</p>
                                        <p className="text-gray-600 text-sm mt-2">{product.shortDescription}</p>
                                    </div>
                                    <div className='my-2.5 w-full flex gap-2.5 px-2'>
                                        <button 
                                            onClick={(e) => handelAddToCart(product._id, e)} 
                                            className='flex-1 font-bold p-2 bg-blue-600 hover:bg-blue-700 rounded text-white'
                                        >
                                            Add to Cart
                                        </button>
                                        <button 
                                            onClick={(e) => e.stopPropagation()} 
                                            className='flex-1 font-bold p-2 bg-green-600 hover:bg-green-700 rounded text-white'
                                        >
                                            Order Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && !error && products.length > 0 && (
                    <div className="flex justify-center mt-6">
                        <button 
                            type='button'
                            onClick={() => setPage(prev => prev + 1)}
                            disabled={!hasMore}
                            className={`px-6 py-2 text-white font-bold rounded-xl transition 
                                ${hasMore ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"}`}
                        >
                            {hasMore ? "Next" : "No More Products"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
