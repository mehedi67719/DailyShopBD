import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Authcontext } from "../../Component/Authcomponent/Authcontext";

const Login = () => {
  const { singingoogle, loginemail, forgetpassword } = useContext(Authcontext);

  const { register, handleSubmit, setError, formState: { errors }, getValues } = useForm();

  const handelLogin = (data) => {
    loginemail(data.email, data.password)
      .then(res => console.log(res))
      .catch(err => setError("password", { type: "manual", message: err.message }));
  };

  const handelGoogle = () => {
    singingoogle()
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  const handleForget = () => {
    const email = getValues("email");
    if (!email) {
      setError("email", { type: "manual", message: "Please enter your email" });
      return;
    }

    forgetpassword(email)
      .then(() => alert("Password reset email sent! Check your inbox."))
      .catch(err => setError("email", { type: "manual", message: err.message }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Login to Your Account
        </h2>

                <button
                    onClick={handelGoogle}
                    className="btn w-full bg-white text-black border-[#e5e5e5] flex items-center justify-center gap-3 py-3 rounded-lg hover:bg-gray-50 transition"
                >
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <g>
                            <path d="m0 0H512V512H0" fill="#fff"></path>
                            <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                            <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                            <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                            <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                        </g>
                    </svg>
                    Login with Google
                </button>

        <div className="my-6 flex items-center">
          <div className="flex-1 h-[1px] bg-gray-300"></div>
          <span className="px-4 text-gray-500">or</span>
          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div>

        <form onSubmit={handleSubmit(handelLogin)} className="space-y-4">
          <div>
            <label className="font-semibold text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter your email"
              className="w-full text-black mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="font-semibold text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Enter your password"
              className="w-full text-black mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div className="text-right -mt-2">
            <button type="button" onClick={handleForget} className="text-green-600 hover:underline text-sm font-medium">
              Forgot Password?
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Login
          </motion.button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Don't have an account?
          <a href="/register" className="text-green-700 font-semibold ml-1">Register</a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
