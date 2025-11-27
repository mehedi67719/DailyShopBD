import React, { useContext } from 'react';
import { motion } from "framer-motion";
import { useForm } from 'react-hook-form';
import { Authcontext } from '../../Component/Authcomponent/Authcontext';
import { updateProfile } from 'firebase/auth';

const Register = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const { singingoogle, registerwithemail, setloading, loading } = useContext(Authcontext);

    const handelregister = (data) => {
        if (data.password !== data.Confirm_password) {
            setError("Confirm_password", {
                type: "manual",
                message: "Passwords do not match!"
            });
            return;
        }

        registerwithemail(data.email, data.password)
            .then(result => {
                const newuser = result.user;
                updateProfile(newuser, { displayName: data.name })
                    .then(() => setloading(false))
                    .catch(err => {
                        console.log(err);
                        setloading(false);
                    });
            })
            .catch(err => console.log(err));
    };

    const handelgoogle = () => {
        singingoogle()
            .then(result => console.log(result))
            .catch(err => {
                console.log(err);
                setloading(false);
            });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg"
            >
                <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
                    Create an Account
                </h2>

            
                <button
                    onClick={handelgoogle}
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

                <form onSubmit={handleSubmit(handelregister)} className="space-y-4">
                    <div>
                        <label className="text-gray-700 font-semibold">Full Name</label>
                        <input
                            {...register('name', { required: "Name is required" })}
                            type="text"
                            placeholder="Enter your full name"
                            className="w-full text-black mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                        {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="text-gray-700 font-semibold">Email</label>
                        <input
                            {...register('email', { required: "Email is required" })}
                            type="email"
                            placeholder="Enter your email"
                            className="w-full text-black mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                        {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="text-gray-700 font-semibold">Password</label>
                        <input
                            {...register('password', {
                                required: "Password is required",
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=-]).{6,}$/,
                                    message: "Password must have 1 uppercase, 1 lowercase, 1 number, 1 special character and at least 6 characters"
                                }
                            })}
                            type="password"
                            placeholder="Enter password"
                            className="w-full text-black mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                        {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
                    </div>

                    <div>
                        <label className="text-gray-700 font-semibold">Confirm Password</label>
                        <input
                            {...register('Confirm_password', {
                                required: "Confirm password is required",
                                pattern: {
                                    value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=-]).{6,}$/,
                                    message: "Invalid characters not allowed"
                                }
                            })}
                            type="password"
                            placeholder="Confirm password"
                            className="w-full text-black mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                        {errors.Confirm_password && <p className='text-red-600 text-sm'>{errors.Confirm_password.message}</p>}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
                    >
                        Register
                    </motion.button>
                </form>

                <p className="text-center mt-4 text-gray-600">
                    Already have an account?
                    <a href="/login" className="text-green-700 font-semibold ml-1">Login</a>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
