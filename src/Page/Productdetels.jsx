import React, { useEffect, useState } from 'react';
import { set } from 'react-hook-form';
import { Link, useParams } from 'react-router';

const Productdetels = () => {
    const {id}=useParams();
    const [product,setproduct]=useState(null);
    const [loader,setloader]=useState(true)
    const [error,seterror]=useState(null)

    useEffect(()=>{
        fetch(`http://localhost:3000/product-detels/${id}`)
        .then(res=>res.json())
        .then(data=>{
            setproduct(data);
            setloader(false)
        })
        .catch(err=>{
            seterror(err);
            setloader(false)
        })
    },[id])

console.log(product)


    if(loader){
        return <p className='flex justify-center items-center text-3xl font-bold'>loading product detels ...</p>
    }

    if(error){
        return <p className='flex justify-center items-center text-3xl font-bold'>Error : {error}</p>
    }

    if(!product){
        return <p className='flex justify-center items-center text-3xl font-bold'>Product is not found</p>
    }

    return (
          <div className="p-10 bg-gray-100 min-h-screen flex justify-center items-start">
            <div className="max-w-6xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row gap-10">
                
                
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full lg:w-1/2 h-[500px] object-cover"
                />

               
                <div className="p-10 flex flex-col justify-between">
                    <div>
                        <Link to="/products" className="text-blue-600 font-semibold mb-4 inline-block hover:underline">&larr; Back to Products</Link>
                        <h2 className="text-4xl font-extrabold text-gray-900">{product.name}</h2>
                        <p className="text-gray-500 text-lg mt-2">{product.category} | {product.brand}</p>
                        <p className="text-green-600 font-bold text-3xl mt-6">${product.price}</p>
                        <p className="text-gray-700 mt-6 text-lg leading-relaxed">{product.longDescription}</p>
                        <p className={`mt-4 text-lg font-semibold ${product.inStock ? "text-green-600" : "text-red-600"}`}>
                            {product.inStock ? "In Stock ✅" : "Out of Stock ❌"}
                        </p>
                        <p className="text-yellow-500 mt-2 text-lg">Rating: {product.rating} ({product.reviewsCount} reviews)</p>
                    </div>

                   
                    <button
                        className="mt-10 px-8 py-4 bg-green-600 text-white font-bold text-xl rounded-2xl hover:bg-green-700 transition"
                        onClick={() => alert('Order placed successfully!')}
                    >
                        Order Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Productdetels;