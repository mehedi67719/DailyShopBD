import React, { useContext } from "react";
import { Authcontext } from "../Component/Authcomponent/Authcontext";
import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
  const { user } = useContext(Authcontext);

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-bold">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 flex justify-center items-center py-10 px-4">
      <div className="bg-white w-full max-w-2xl shadow-xl rounded-2xl p-10">

      
        <div className="flex flex-col items-center">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="profile"
              className="w-32 h-32 rounded-full border-4 border-green-500 shadow-md object-cover"
              onError={(e) =>
                (e.target.src =
                  "https://cdn-icons-png.flaticon.com/512/847/847969.png")
              }
            />
          ) : (
            <FaUserCircle className="text-[140px] text-green-600" />
          )}

          <h2 className="text-3xl font-bold text-green-900 mt-4">
            {user.displayName || "Unknown User"}
          </h2>
          <p className="text-gray-500 mt-1">
            MERN Stack Developer
          </p>
        </div>

        <div className="w-full h-[2px] bg-green-200 my-6"></div>

      
        <h3 className="text-xl font-bold text-green-900 mb-4">
          Account Details
        </h3>

        <div className="space-y-4 text-[17px]">
          <div className="flex justify-between">
            <p className="font-semibold text-gray-700">Email:</p>
            <p className="text-green-800">{user.email}</p>
          </div>

          <div className="flex justify-between">
            <p className="font-semibold text-gray-700">Email Verified:</p>
            <p
              className={`${
                user.emailVerified ? "text-green-700" : "text-red-600"
              } font-semibold`}
            >
              {user.emailVerified ? "Yes" : "No"}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="font-semibold text-gray-700">User ID (UID):</p>
            <p className="text-green-800">{user.uid}</p>
          </div>

          <div className="flex justify-between">
            <p className="font-semibold text-gray-700">Provider:</p>
            <p className="text-green-800">
              {user.providerData[0].providerId}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="font-semibold text-gray-700">Account Created:</p>
            <p className="text-green-800">
              {new Date(user.metadata.creationTime).toLocaleString()}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="font-semibold text-gray-700">Last Login:</p>
            <p className="text-green-800">
              {new Date(user.metadata.lastSignInTime).toLocaleString()}
            </p>
          </div>
        </div>

     
        <div className="mt-10 flex flex-col md:flex-row gap-4">
          <button className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold shadow w-full">
            Edit Profile
          </button>

          <button className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold shadow w-full">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
