import { FaUserCircle, FaEnvelope, FaPhone, FaIdBadge, FaCalendarAlt, FaLock, FaUser } from "react-icons/fa";
import { Link } from "react-router";
import { deleteUser, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import Useauth from "../Component/hook/Useauth";

const Profile = () => {
  const { user } = Useauth();

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-bold text-green-800">
        Loading profile...
      </div>
    );
  }

  const handeldeleteaccount = async () => {
    if (!user) return;
    try {
      if (user.providerData[0].providerId === "password") {
        const password = prompt("Enter your password to confirm deletion:");
        if (!password) return;
        const credential = EmailAuthProvider.credential(user.email, password);
        await reauthenticateWithCredential(user, credential);
      }
      await deleteUser(user);
      alert("Account deleted successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex justify-center py-10 px-4">
      <div className="bg-white w-full max-w-[95%] shadow-2xl rounded-3xl p-10">
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
          <p className="text-gray-500 mt-1 text-lg">MERN Stack Developer</p>
        </div>

        <div className="w-full h-[2px] bg-green-200 my-6"></div>

        <h3 className="text-2xl font-bold text-green-900 mb-6 text-center">Account Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl shadow hover:shadow-lg transition">
            <FaEnvelope className="text-green-600 text-xl" />
            <div>
              <p className="text-gray-700 font-semibold">Email</p>
              <p className="text-green-800">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl shadow hover:shadow-lg transition">
            <FaPhone className="text-green-600 text-xl" />
            <div>
              <p className="text-gray-700 font-semibold">Phone</p>
              <p className="text-green-800">{user.phoneNumber || "Not Added"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl shadow hover:shadow-lg transition">
            <FaIdBadge className="text-green-600 text-xl" />
            <div>
              <p className="text-gray-700 font-semibold">UID</p>
              <p className="text-green-800">{user.uid}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl shadow hover:shadow-lg transition">
            <FaLock className="text-green-600 text-xl" />
            <div>
              <p className="text-gray-700 font-semibold">Account Type</p>
              <p className="text-green-800">{user.providerData[0]?.providerId || "Unknown"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl shadow hover:shadow-lg transition">
            <FaCalendarAlt className="text-green-600 text-xl" />
            <div>
              <p className="text-gray-700 font-semibold">Created At</p>
              <p className="text-green-800">{new Date(user.metadata?.creationTime).toLocaleString()}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl shadow hover:shadow-lg transition">
            <FaUser className="text-green-600 text-xl" />
            <div>
              <p className="text-gray-700 font-semibold">Display Name</p>
              <p className="text-green-800">{user.displayName || "Not Added"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl shadow hover:shadow-lg transition">
            <FaCalendarAlt className="text-green-600 text-xl" />
            <div>
              <p className="text-gray-700 font-semibold">Last Login</p>
              <p className="text-green-800">{new Date(user.metadata?.lastSignInTime).toLocaleString()}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl shadow hover:shadow-lg transition">
            <FaLock className="text-green-600 text-xl" />
            <div>
              <p className="text-gray-700 font-semibold">Email Verified</p>
              <p className={user.emailVerified ? "text-green-700 font-semibold" : "text-red-600 font-semibold"}>
                {user.emailVerified ? "Yes" : "No"}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full h-[2px] bg-green-200 my-6"></div>

        <div className="mt-6 flex flex-col md:flex-row gap-4">
          <Link
            to='/editprofile'
            className="bg-green-600 hover:bg-green-700 text-center text-white py-3 rounded-xl font-semibold shadow w-full"
          >
            Edit Profile
          </Link>

          <button
            onClick={handeldeleteaccount}
            className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold shadow w-full"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
