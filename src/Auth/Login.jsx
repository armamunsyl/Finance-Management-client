import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Auth/AuthProvider";

const Login = () => {
    const { loginUser, googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        setError("");

        loginUser(email, password)
            .then(() => navigate(from, { replace: true }))
            .catch(() => setError("Invalid email or password"));
    };

    const handleGoogleLogin = () => {
        googleLogin()
            .then(() => navigate(from, { replace: true }))
            .catch(() => setError("Google login failed"));
    };

    return (
        <div className="min-h-screen bg-[#F7FAFC] flex items-center justify-center px-4 mt-4">
            <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md border border-[#E5E7EB]">
                <h2 className="text-3xl font-bold text-center text-[#1F2937] mb-2">
                    Welcome Back!
                </h2>
                <p className="text-center text-[#6B7280] mb-8">
                    Login to your FinEase account
                </p>

                <form onSubmit={handleLogin} className="space-y-5">
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
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="Password"
                            className="w-full px-4 py-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3BB273]"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-[#3BB273] text-white py-2 rounded-lg font-semibold hover:bg-[#34A267] transition-all duration-200"
                    >
                        Login
                    </button>
                </form>

                <div className="flex items-center my-6">
                    <hr className="flex-1 border-[#E5E7EB]" />
                    <span className="px-2 text-sm text-[#9CA3AF]">or</span>
                    <hr className="flex-1 border-[#E5E7EB]" />
                </div>

                <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-2 border border-[#D1D5DB] py-2 rounded-lg hover:bg-[#F9FAFB] transition-all duration-200"
                >
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                        alt="Google icon"
                        className="w-5 h-5"
                    />
                    <span className="font-medium text-[#374151]">
                        Continue with Google
                    </span>
                </button>

                <p className="text-center text-sm text-[#6B7280] mt-6">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-[#3BB273] font-medium hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
