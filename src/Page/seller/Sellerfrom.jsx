import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Useauth from "../../Component/hook/Useauth";

const SellerRegisterForm = () => {
  const { user } = Useauth();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      sellerName: user?.displayName || "",
      email: user?.email || "",
      phone: user?.phoneNumber || ""
    }
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    reset({
      sellerName: user?.displayName || "",
      email: user?.email || "",
      phone: user?.phoneNumber || ""
    });
  }, [user, reset]);

  const onSubmit = async (formData) => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:3000/sellers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      setMessage("Seller account created successfully!");
      reset();
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-xl my-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">Seller Account Register</h2>

      {message && <p className="text-center mb-3 text-red-600">{message}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-black">
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
          className="w-full border px-3 py-2 rounded"
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
    </div>
  );
};

export default SellerRegisterForm;
