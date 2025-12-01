import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Useauth from '../Component/hook/Useauth';

const Products = () => {
  const { user } = Useauth();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All'); // NEW
  const [categories, setCategories] = useState([]); // NEW

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();

  // Fetch products with Search + Category
  useEffect(() => {
    setLoading(true);

    fetch(
      `http://localhost:3000/products?search=${searchTerm}&category=${category}&page=${page}&limit=8`
    )
      .then(res => res.json())
      .then(data => {
        if (page === 1) setProducts(data.products);
        else setProducts(prev => [...prev, ...data.products]);

        setHasMore(page < data.totalpages);
        setLoading(false);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [searchTerm, category, page]);

  // Fetch categories
  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(() => setCategories([]));
  }, []);

  // Fetch cart items
  useEffect(() => {
    fetch("http://localhost:3000/cart")
      .then(res => res.json())
      .then(data => setCartItems(data))
      .catch(() => setCartItems([]));
  }, []);

  const handleProductClick = (id) => navigate(`/productdetels/${id}`);

  const handelAddToCart = (id, e) => {
    e.stopPropagation();
    if (!user) return alert("Please login first!");

    const product = products.find(p => p._id === id);
    if (cartItems.find(item => item._id === id)) {
      return alert("Product already in cart!");
    }

    const data = { ...product, userEmail: user.email };

    fetch("http://localhost:3000/cart", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(resData => {
        setCartItems(prev => [...prev, { ...data, _id: resData.insertedId }]);
        alert("Product added to cart!");
      });
  };

  const handelOrder = (id, e) => {
    if (e) e.stopPropagation();
    navigate(`/orderpage/${id}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="lg:max-w-[90%] mx-auto">

        {/* --------------------- SEARCH + CATEGORY FILTER ---------------------- */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          
          {/* Left: Search */}
          <div className="w-full sm:w-1/3">
            <input
              type="search"
              placeholder="Search products..."
              value={searchTerm}
              onChange={e => {
                setPage(1);
                setSearchTerm(e.target.value);
              }}
              className="w-full border-2 border-black text-black px-4 py-2 rounded-lg"
            />
          </div>

          {/* Right: Category Dropdown */}
          <div className="w-full sm:w-1/3">
            <select
              value={category}
              onChange={e => {
                setPage(1);
                setCategory(e.target.value);
              }}
              className="w-full border-2 border-black text-black px-4 py-2 rounded-lg"
            >
              <option value="All">All Categories</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* --------------------- PRODUCT LISTING ---------------------- */}

        {loading && <p className="text-2xl text-center font-bold">Loading products...</p>}
        {error && <p className="text-red-600 text-center mt-4">Error: {error}</p>}
        {!loading && !error && products.length === 0 && (
          <p className="text-center text-gray-600">No products found.</p>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <div
                key={product._id}
                onClick={() => handleProductClick(product._id)}
                className="bg-white border rounded-xl shadow-md overflow-hidden transform hover:scale-105 hover:shadow-2xl cursor-pointer flex flex-col"
              >
                <img src={product.image} className="w-full h-56 object-cover" />
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
                    <p className="text-green-600 font-semibold mt-2">${product.price}</p>
                    <p className="text-gray-600 text-sm mt-2">{product.shortDescription}</p>
                  </div>

                  <div className="my-2.5 w-full flex gap-2.5 px-2">
                    <button
                      onClick={e => handelAddToCart(product._id, e)}
                      className="flex-1 font-bold p-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={e => handelOrder(product._id, e)}
                      className="flex-1 font-bold p-2 bg-green-600 hover:bg-green-700 rounded text-white"
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --------------------- NEXT BUTTON ---------------------- */}
        {!loading && !error && products.length > 0 && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setPage(prev => prev + 1)}
              disabled={!hasMore}
              className={`px-6 py-2 text-white font-bold rounded-xl ${
                hasMore ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
              }`}
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
