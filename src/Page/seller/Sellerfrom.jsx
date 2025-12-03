import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Useauth from "../../Component/hook/Useauth";

const SellerRegisterForm = () => {
  const { user } = Useauth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [seller, setSeller] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      sellerName: user?.displayName || "",
      email: user?.email || "",
      phone: user?.phoneNumber || ""
    }
  });


  const {
    register: registerProduct,
    handleSubmit: handleProductSubmit,
    reset: resetProduct,
    formState: { errors: productErrors }
  } = useForm();


  useEffect(() => {
    fetch("https://daily-shop-bd-server.vercel.app/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(() => setCategories([]));
  }, []);


  useEffect(() => {
    const getseller = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const res = await fetch("https://daily-shop-bd-server.vercel.app/seller");
        const data = await res.json();
        const found = data.find(s => s.email === user.email);
        setSeller(found || null);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    getseller();
  }, [user]);


  const onSellerSubmit = async (formData) => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("https://daily-shop-bd-server.vercel.app/sellers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
      setMessage("Seller account created successfully!");
      reset();
      setSeller(data); 
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };


  const onProductSubmit = async (formData) => {
    if (!user) return;
    setLoading(true);
    setMessage("");
    try {
      const productData = {
        ...formData,
        sellerEmail: user.email,
        currency: "USD",
        inStock: true,
        rating: 0,
        reviewsCount: 0
      };


      console.log(productData)
      const res = await fetch("https://daily-shop-bd-server.vercel.app/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Product add failed");
      setMessage("Product added successfully!");
      resetProduct();
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-xl my-8">
      {seller ? (
        <>
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Add Product</h2>
          {message && <p className="text-center mb-3 text-green-600">{message}</p>}
          <form onSubmit={handleProductSubmit(onProductSubmit)} className="space-y-4 text-black">

            <input
              type="text"
              placeholder="Product Name"
              {...registerProduct("name", { required: true })}
              className="w-full border px-3 py-2 rounded"
            />
            {productErrors.name && <p className="text-red-600 text-sm">Required</p>}

            <input
              type="text"
              placeholder="Brand"
              {...registerProduct("brand", { required: true })}
              className="w-full border px-3 py-2 rounded"
            />
            {productErrors.brand && <p className="text-red-600 text-sm">Required</p>}

            <select
              {...registerProduct("category", { required: true })}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
            {productErrors.category && <p className="text-red-600 text-sm">Required</p>}

            <input
              type="number"
              step="0.01"
              placeholder="Price"
              {...registerProduct("price", { required: true })}
              className="w-full border px-3 py-2 rounded"
            />
            {productErrors.price && <p className="text-red-600 text-sm">Required</p>}

            <input
              type="text"
              placeholder="Short Description"
              {...registerProduct("shortDescription", { required: true })}
              className="w-full border px-3 py-2 rounded"
            />
            {productErrors.shortDescription && <p className="text-red-600 text-sm">Required</p>}

            <textarea
              placeholder="Long Description"
              {...registerProduct("longDescription", { required: true })}
              className="w-full border px-3 py-2 rounded"
            ></textarea>
            {productErrors.longDescription && <p className="text-red-600 text-sm">Required</p>}

            <input
              type="text"
              placeholder="Image URL"
              {...registerProduct("image", { required: true })}
              className="w-full border px-3 py-2 rounded"
            />
            {productErrors.image && <p className="text-red-600 text-sm">Required</p>}

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
          </form>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Seller Account Register</h2>
          {message && <p className="text-center mb-3 text-red-600">{message}</p>}
          <form onSubmit={handleSubmit(onSellerSubmit)} className="space-y-4 text-black">
            <input
              type="text"
              placeholder="Your Name"
              {...register("sellerName", { required: true })}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.sellerName && <p className="text-red-600 text-sm">Required</p>}

            <input
              type="text"
              placeholder="Shop / Company Name"
              {...register("shopName", { required: true })}
              className="w-full border px-3 py-2 rounded"
            />

            <input
              type="email"
              placeholder="Email Address"
              {...register("email", { required: true })}
              className="w-full border px-3 py-2 rounded bg-gray-100"
              readOnly
            />

            <input
              type="text"
              placeholder="Phone Number"
              {...register("phone", { required: true })}
              className="w-full border px-3 py-2 rounded"
            />

            <input
              type="text"
              placeholder="Shop Address"
              {...register("address", { required: true })}
              className="w-full border px-3 py-2 rounded"
            />

            <select
              {...register("businessType", { required: true })}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select Business Category</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat.name}>{cat.name}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Shop Logo URL"
              {...register("logo")}
              className="w-full border px-3 py-2 rounded"
            />

            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Seller Account"}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default SellerRegisterForm;
