import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';

const Productdetels = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState(null);
    const navigate=useNavigate();

    useEffect(() => {
        fetch(`https://daily-shop-bd-server.vercel.app/product-detels/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoader(false);
            })
            .catch(err => {
                setError(err);
                setLoader(false);
            });
    }, [id]);


      const handelOrder = (id, e) => {
    if (e) e.stopPropagation();
    navigate(`/orderpage/${id}`);
  };

    if (loader) return <p className='flex justify-center items-center text-3xl font-bold mt-20'>Loading product details...</p>;
    if (error) return <p className='flex justify-center items-center text-3xl font-bold mt-20'>Error: {error}</p>;
    if (!product) return <p className='flex justify-center items-center text-3xl font-bold mt-20'>Product not found</p>;

    return (
        <div className="py-6 bg-gray-100 min-h-screen flex justify-center">
            <div className="w-full max-w-[95%] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row gap-8 lg:gap-12">
                
                <div className="w-full lg:w-1/2 h-auto flex justify-center items-center p-4">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-[500px] object-contain rounded-xl"
                    />
                </div>

                <div className="flex-1 p-6 lg:p-10 flex flex-col justify-between">
                    <div className="overflow-y-auto">
                        <Link to="/products" className="text-blue-600 font-semibold mb-4 inline-block hover:underline">&larr; Back to Products</Link>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">{product.name}</h2>
                        <p className="text-gray-500 text-md md:text-lg mt-2">{product.category} | {product.brand}</p>
                        <p className="text-green-600 font-bold text-2xl md:text-3xl mt-6">${product.price}</p>
                        <p className="text-gray-700 mt-6 text-md md:text-lg leading-relaxed">{product.longDescription}</p>
                        <p className={`mt-4 text-lg font-semibold ${product.inStock ? "text-green-600" : "text-red-600"}`}>
                            {product.inStock ? "In Stock ✅" : "Out of Stock ❌"}
                        </p>
                        <p className="text-yellow-500 mt-2 text-md md:text-lg">Rating: {product.rating} ({product.reviewsCount} reviews)</p>
                    </div>

                    <button
                        className="mt-6 md:mt-10 px-6 md:px-10 py-3 md:py-4 bg-green-600 text-white font-bold text-lg md:text-xl rounded-2xl hover:bg-green-700 transition w-full"
                        onClick={e =>handelOrder(product._id,e) }
                    >
                        Order Now
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Productdetels;
