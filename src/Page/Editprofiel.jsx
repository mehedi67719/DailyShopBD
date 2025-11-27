import React, { useContext, useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Authcontext } from "../Component/Authcomponent/Authcontext";

const EditProfile = () => {
  const { user } = useContext(Authcontext);

  const [profileData, setProfileData] = useState({
    displayName: "",
    bio: "",
    phone: "",
    address: "",
    country: "",
    photoURL: "",
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

  if (!user) return <div className="min-h-screen flex justify-center items-center text-xl font-bold">Loading...</div>;

  return (
    <div className="min-h-screen bg-green-50 flex justify-center items-center py-10 px-4">
      <div className="bg-white w-full max-w-2xl shadow-xl rounded-2xl p-10">
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            {profileData.photoURL ? (
              <img
                src={profileData.photoURL}
                alt="profile"
                className="w-32 h-32 rounded-full border-4 border-green-500 shadow-md object-cover"
              />
            ) : (
              <div className="w-32 h-32 flex items-center justify-center bg-green-200 rounded-full border-4 border-green-500 text-green-600 text-6xl">
                U
              </div>
            )}

            <div className="border-2 border-black text-black mt-1.5 rounded-2xl bg-green-500 p-1">
                {
                   profileData.photoURL?(<button>Update Image</button>):(<button>Upload Image</button>) 
                }
            </div>
          </div>
          <h2 className="text-2xl font-bold text-green-900 mt-4">{profileData.displayName}</h2>
        </div>

        <div className="space-y-4">
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
