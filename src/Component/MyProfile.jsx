import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import Swal from "sweetalert2";

const MyProfile = () => {
  const { user, updateUserProfile, logOut, refreshUser } =
    useContext(AuthContext) || {};

  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    setName(user?.displayName || "");
    setPhotoURL(
      user?.photoURL ||
        "https://cdn-icons-png.flaticon.com/512/847/847969.png"
    );
  }, [user]);

  const handleUpdate = (e) => {
    e.preventDefault();

    updateUserProfile(name, photoURL)
      .then(() => {
        refreshUser(); 

        Swal.fire({
          icon: "success",
          title: "Profile Updated!",
          text: "Your changes are saved.",
          confirmButtonColor: "#3BB273",
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Update Failed!",
          text: "Try again later.",
          confirmButtonColor: "#EF4444",
        });
      });
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#3BB273",
      confirmButtonText: "Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut().then(() => {
          Swal.fire({
            icon: "success",
            title: "Logged out!",
            confirmButtonColor: "#3BB273",
          });
        });
      }
    });
  };

  return (
    <section className="bg-[#F7FAFC] min-h-screen px-4 md:px-20 py-12 flex justify-center items-center">
      <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-md w-full max-w-md p-8 text-center">

        <div className="flex justify-center mb-6">
          <img
            src={photoURL}
            alt="User Avatar"
            className="w-28 h-28 rounded-full border-4 border-[#3BB273] shadow-sm object-cover"
          />
        </div>

        <h2 className="text-2xl font-semibold text-[#1F2937] mb-1">
          {name}
        </h2>

        <p className="text-[#6B7280] mb-6">{user?.email}</p>

        <form onSubmit={handleUpdate} className="space-y-5 text-left">
          <div>
            <label className="block font-medium mb-1 text-[#374151]">
              Name
            </label>
            <input
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg bg-white"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-[#374151]">
              Photo URL
            </label>
            <input
              type="text"
              value={photoURL}
              required
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#3BB273] text-white py-2 rounded-lg font-semibold hover:bg-[#34A267] transition-all"
          >
            Update Profile
          </button>
        </form>

        <button
          onClick={handleLogout}
          className="w-full bg-[#EF4444] text-white py-2 rounded-lg font-semibold hover:bg-[#DC2626] transition-all duration-200 mt-4"
        >
          Logout
        </button>
      </div>
    </section>
  );
};

export default MyProfile;
