import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Link, useNavigate } from 'react-router';
import Useauth from '../../Component/hook/Useauth';

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const { user } = Useauth();

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("http://localhost:3000/categories");
      const data = await res.json();
      setCategories(data);
      setLoading(false);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchTopProducts = async () => {
      const res = await fetch("http://localhost:3000/top-rated-products");
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    };
    fetchTopProducts();
  }, []);

  const handelAddToCart = (productId, e) => {
          if(!user){
        alert("Login first then you can add products to cart.");
        return;
      }
    e.stopPropagation();
    const filterproduct = products.find(p => p._id.toString() === productId.toString());
    const data = { ...filterproduct, userEmail: user.email };

    fetch("http://localhost:3000/cart", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(() => alert('Product added to cart successfully!'));
  };

  const handelorder = (productId, e) => {
    e.stopPropagation();
    navigate(`/orderpage/${productId}`);
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen">

      <section className="bg-green-800 text-white py-20 max-w-[95%] mx-auto rounded-3xl mt-5">
        <div className="px-6 md:px-20 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Welcome to DailyShopBD</h1>
          <p className="text-lg md:text-xl mb-8">
            Discover amazing products at unbeatable prices with fast, reliable delivery.
          </p>
          <Link
            to="/products"
            className="bg-yellow-400 text-green-900 px-8 py-3 rounded-xl font-bold shadow hover:bg-yellow-300 transition"
          >
            Shop Now
          </Link>
        </div>
      </section>

      <section className="py-16 max-w-[95%] mx-auto mt-10">
        <h2 className="text-3xl font-bold text-green-800 mb-10 text-center">Shop by Category</h2>

        <Swiper
          slidesPerView={3}
          spaceBetween={20}
          navigation
          loop
          autoplay={{ delay: 2500 }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Pagination, Navigation, Autoplay]}
          pagination={{ clickable: true }}
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:shadow-2xl transition">
                <img
                  src={category.img}
                  alt={category.name}
                  className="rounded-xl mb-3 w-full h-40 object-cover"
                />
                <span className="font-semibold text-green-800">{category.name}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="py-16 bg-gray-200 max-w-[95%] mx-auto mt-10 rounded-3xl">
        <h2 className="text-3xl font-bold text-green-800 mb-10 text-center">Popular Products</h2>

        {loading ? (
          <p className="text-center text-lg font-bold">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 md:px-10">
            {products.map(product => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition hover:shadow-2xl hover:scale-105"
              >
                <Link to={`/productdetels/${product._id}`}>
                  <img src={product.image} className="w-full h-56 object-cover" />

                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                    <p className="text-green-600 font-semibold mt-2">${product.price}</p>
                    <p className="text-gray-600 text-sm mt-2">{product.shortDescription}</p>
                  </div>
                </Link>

                <div className="flex gap-3 px-5 pb-5">
                  <button
                    onClick={(e) => handelAddToCart(product._id, e)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={(e) => handelorder(product._id, e)}
                    className="flex-1 bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            to="/products"
            className="px-8 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700"
          >
            All Products
          </Link>
        </div>
      </section>

      <section className="py-16 max-w-[95%] mx-auto mt-10">
        <h2 className="text-3xl font-bold text-green-800 mb-10 text-center">Why Choose DailyShopBD</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition">
            <h3 className="text-xl font-bold text-green-700 mb-3">Quality Products</h3>
            <p className="text-gray-600">Only the best items for our customers.</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition">
            <h3 className="text-xl font-bold text-green-700 mb-3">Fast Delivery</h3>
            <p className="text-gray-600">Quick and reliable delivery service.</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition">
            <h3 className="text-xl font-bold text-green-700 mb-3">Customer Support</h3>
            <p className="text-gray-600">We are here to help you 24/7.</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-green-800 text-white text-center max-w-[95%] mx-auto mt-10 rounded-3xl mb-10">
        <h2 className="text-4xl font-bold mb-4">Start Your Shopping Journey Today!</h2>
        <p className="text-lg md:text-xl mb-8">Join DailyShopBD and explore thousands of amazing products.</p>

        <Link
          to="/products"
          className="bg-yellow-400 text-green-900 px-8 py-3 rounded-xl font-bold hover:bg-yellow-300 transition"
        >
          Shop Now
        </Link>
      </section>

    </div>
  );
};

export default Home;
