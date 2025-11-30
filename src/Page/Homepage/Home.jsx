import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Link, useNavigate } from 'react-router';
import Useauth from '../../Component/hook/Useauth';

const Home = () => {
  const navigate=useNavigate()
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const {user}=Useauth()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:3000/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:3000/top-rated-products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopProducts();
  }, []);





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


        const handelorder = (productId, e) => {
        if(e) e.stopPropagation();
        navigate(`/orderpage/${productId}`);
    }


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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <div key={product._id} className="bg-white border rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl flex flex-col">
                <Link to={`/productdetels/${product._id}`} className="flex-1 cursor-pointer">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-4 flex flex-col">
                    <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                    <p className="text-green-600 font-semibold mt-2">${product.price}</p>
                    <p className="text-gray-600 text-sm mt-2">{product.shortDescription}</p>
                  </div>
                </Link>
                <div className='my-2.5 w-full flex gap-2.5 px-2'>
                  <button onClick={(e)=>handelAddToCart(product._id ,e)} className='flex-1 font-bold p-2 bg-blue-600 hover:bg-blue-700 rounded text-white'>Add to Cart</button>
                  <button 
                  onClick={(e) => handelorder(product._id, e)} 
                  className='flex-1 font-bold p-2 bg-green-600 hover:bg-green-700 rounded text-white'
                  >Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className='flex justify-center mt-10'>
          <Link to='/products' className='px-6 py-3 bg-green-600 hover:bg-green-700 font-bold text-white rounded-xl'>All Products</Link>
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
