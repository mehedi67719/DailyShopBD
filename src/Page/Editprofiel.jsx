import React, { useState, useEffect } from "react";
import { FaUserCircle, FaEnvelope, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Useauth from "../Component/hook/Useauth";

const EditProfile = () => {
  const { user } = Useauth();
  const [profileData, setProfileData] = useState({
    displayName: "",
    bio: "",
    phone: "",
    address: "",
    country: "",
    photoURL: "",
    email: "",
    emailVerified: false,
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        displayName: user.displayName || "",
        bio: user.bio || "",
        phone: user.phoneNumber || "",
        address: user.address || "",
        country: user.country || "",
        photoURL: user.photoURL || "",
        email: user.email || "",
        emailVerified: user.emailVerified || false,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({ ...profileData, photoURL: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    alert("Profile design demo only, no update functionality.");
  };

  if (!user) return <div className="min-h-screen flex justify-center items-center text-xl font-bold text-green-800">Loading...</div>;

  return (
    <div className="min-h-screen bg-green-50 flex justify-center py-10 px-4">
      <div className="bg-white w-full max-w-[95%] shadow-2xl rounded-3xl p-10">
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            {profileData.photoURL ? (
              <img
                src={profileData.photoURL}
                alt="profile"
                className="w-32 h-32 rounded-full border-4 border-green-500 shadow-md object-cover"
              />
            ) : (
              <FaUserCircle className="text-[140px] text-green-600" />
            )}
            <div className="mt-2">
              <input type="file" onChange={handleFileChange} className="hidden" id="profileUpload" />
              <label htmlFor="profileUpload" className="cursor-pointer px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition">
                {profileData.photoURL ? "Update Image" : "Upload Image"}
              </label>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-green-900 mt-4">{profileData.displayName}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="displayName"
              value={profileData.displayName}
              onChange={handleChange}
              className="w-full border-2 border-black text-black px-4 py-2 rounded-xl focus:outline-none focus:ring-2"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Email</label>
            <div className="flex items-center gap-2">
              <input
                type="email"
                name="email"
                value={profileData.email}
                readOnly
                className="w-full border-2 border-black text-black px-4 py-2 rounded-xl bg-gray-100 cursor-not-allowed"
              />
              {profileData.emailVerified ? (
                <FaCheckCircle className="text-green-600" title="Verified" />
              ) : (
                <FaTimesCircle className="text-red-600" title="Not Verified" />
              )}
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Bio</label>
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleChange}
              className="w-full border-2 border-black text-black px-4 py-2 rounded-xl focus:outline-none focus:ring-2"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={profileData.phone}
              onChange={handleChange}
              className="w-full border-2 border-black text-black px-4 py-2 rounded-xl focus:outline-none focus:ring-2"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={profileData.address}
              onChange={handleChange}
              className="w-full border-2 border-black text-black px-4 py-2 rounded-xl focus:outline-none focus:ring-2"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Country</label>
            <input
              type="text"
              name="country"
              value={profileData.country}
              onChange={handleChange}
              className="w-full border-2 border-black text-black px-4 py-2 rounded-xl focus:outline-none focus:ring-2"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold shadow w-full"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
