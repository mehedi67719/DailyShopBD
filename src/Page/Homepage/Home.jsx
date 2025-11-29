import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Link } from 'react-router';

const categories = [
  { name: "Electronics", img: "https://images.unsplash.com/photo-1510557880182-3eec8c875fe0?auto=format&fit=crop&w=400&q=80" },
  { name: "Fashion", img: "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=400&q=80" },
  { name: "Books", img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80" },
  { name: "Home & Living", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80" },
  { name: "Sports", img: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=400&q=80" },
  { name: "Toys", img: "https://images.unsplash.com/photo-1606813908029-c03f868c6ee3?auto=format&fit=crop&w=400&q=80" },
  { name: "Beauty", img: "https://images.unsplash.com/photo-1600185364101-6ed5d89fa57b?auto=format&fit=crop&w=400&q=80" },
];

const Home = () => {

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchtopproducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:3000/top-rated-products");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchtopproducts();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">

  
      <section className="bg-green-800 text-white py-20 px-6 md:px-20 flex flex-col items-center text-center">
        <div className="md:w-2/3 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Welcome to DailyShopBD
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Discover amazing products at unbeatable prices. Shop with ease and enjoy fast delivery!
          </p>


          <Link to='/products' className="bg-yellow-400 text-green-900 px-6 py-3 rounded-xl font-bold shadow hover:bg-yellow-300 transition">
            Shop Now
          </Link>
        </div>
      </section>

      
      <section className="py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">
          Shop by Category
        </h2>

        <Swiper
          slidesPerView={3}
          spaceBetween={20}
          navigation
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 10 },
            640: { slidesPerView: 2, spaceBetween: 15 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
          }}
          modules={[Pagination, Navigation, Autoplay]}
          pagination={{ clickable: true }}
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:shadow-2xl transition cursor-pointer">
                <img src={category.img} alt={category.name} className="rounded-xl mb-3 w-full h-32 object-cover"/>
                <span className="font-semibold text-green-800">{category.name}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="py-16 px-6 md:px-20 bg-gray-100">
        <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">
          Popular Products
        </h2>

        {loading ? (
          <p className="text-center text-lg font-bold">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {product.map((item) => (
              <Link to={`/productdetels/${item._id}`}  key={item._id} className="bg-white rounded-xl shadow-lg p-4 hover:shadow-2xl transition cursor-pointer">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="rounded-xl mb-4 w-full h-48 object-cover"
                />
                <h3 className="font-bold text-green-800 mb-2">{item.name}</h3>
                <p className="text-gray-700 mb-2">${item.price}</p>
                <p className="text-yellow-500 mb-2">Rating: {item.rating} ⭐</p>
                <button className="bg-green-800 text-white px-4 py-2 rounded-xl font-semibold hover:bg-green-700 transition">
                  Add to Cart
                </button>
              </Link>
            ))}
          </div>
        )}
        <div className='flex justify-center'>
          <Link to='/products' className='p-3  mt-10 bg-green-600 hover:bg-green-700 font-bold  text-white rounded-xl'>All Products</Link>
        </div>
      </section>


      <section className="py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">
          Why Choose DailyShopBD
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
            <h3 className="font-bold text-green-700 mb-2">Quality Products</h3>
            <p className="text-gray-600">Only the best items for our customers.</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
            <h3 className="font-bold text-green-700 mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Quick and reliable delivery service.</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
            <h3 className="font-bold text-green-700 mb-2">Customer Support</h3>
            <p className="text-gray-600">24/7 support for all your queries.</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 md:px-20 text-center bg-green-800 text-white rounded-t-3xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Start Your Shopping Journey Today!
        </h2>
        <p className="mb-6 text-lg md:text-xl">Join DailyShopBD and explore thousands of amazing products.</p>
        <Link to='/products' className="bg-yellow-400 text-green-900 px-6 py-3 rounded-xl font-bold shadow hover:bg-yellow-300 transition">
          Shop Now
        </Link>
      </section>

    </div>
  );
};

export default Home;
