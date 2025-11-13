import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Auth/AuthProvider";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, updateUserProfile, googleLogin } =
    useContext(AuthContext) || {};

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);

    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    createUser(email, password)
      .then(() => {
        updateUserProfile(name, photo)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Registration Successful!",
              text: "Welcome to FinEase.",
              confirmButtonColor: "#3BB273",
            });

            navigate("/");
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Profile Update Failed!",
              text: "Your account was created but profile update failed.",
              confirmButtonColor: "#EF4444",
            });
          });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Registration Failed!",
          text: "Please try again.",
          confirmButtonColor: "#EF4444",
        });
      })
      .finally(() => setLoading(false));
  };

  const handleGoogleRegister = () => {
    setLoading(true);

    googleLogin()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Google Sign Up Successful!",
          confirmButtonColor: "#3BB273",
        });

        navigate("/");
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Google Registration Failed!",
          confirmButtonColor: "#EF4444",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC] flex items-center justify-center px-4 mt-4">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md border border-[#E5E7EB]">
        <h2 className="text-3xl font-bold text-center text-[#1F2937] mb-2">
          Create an Account
        </h2>
        <p className="text-center text-[#6B7280] mb-8">
          Join FinEase and manage your money smartly
        </p>

        <form onSubmit={handleRegister} className="space-y-5">
  
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="Abdur Rahman"
              className="w-full px-4 py-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3BB273]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="example@email.com"
              className="w-full px-4 py-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3BB273]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1">
              Photo URL
            </label>
            <input
              type="text"
              name="photo"
              required
              placeholder="Photo URL"
              className="w-full px-4 py-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3BB273]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              className="w-full px-4 py-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3BB273]"
            />
            <p className="text-xs text-[#6B7280] mt-1">
              Must include 1 uppercase, 1 lowercase & minimum 6 characters
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#3BB273] text-white py-2 rounded-lg font-semibold hover:bg-[#34A267] transition-all duration-200 disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-1 border-[#E5E7EB]" />
          <span className="px-2 text-sm text-[#9CA3AF]">or</span>
          <hr className="flex-1 border-[#E5E7EB]" />
        </div>

        <button
          onClick={handleGoogleRegister}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 border border-[#D1D5DB] py-2 rounded-lg hover:bg-[#F9FAFB] transition-all duration-200 disabled:opacity-60"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
            alt="Google icon"
            className="w-5 h-5"
          />
          <span className="font-medium text-[#374151]">Sign up with Google</span>
        </button>

        <p className="text-center text-sm text-[#6B7280] mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#3BB273] font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
