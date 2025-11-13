import { Link, NavLink } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  // console.log(user.photoURL)

  const navLinks = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/add-transaction">Add Transaction</NavLink></li>
      <li><NavLink to="/my-transactions">My Transactions</NavLink></li>
      <li><NavLink to="/reports">Reports</NavLink></li>
    </>
  );

  return (
    <nav className="bg-white text-[#1F2937] shadow-md px-6 md:px-10 py-3 flex items-center justify-between">
      <div>
        <Link to="/" className="text-2xl font-bold tracking-wide">
          <span className="text-[#3BB273]">Fin</span>
          <span className="text-[#1F2937]">Ease</span>
        </Link>
      </div>

      <div className="hidden md:flex">
        <ul className="flex gap-8 text-[16px] font-medium">{navLinks}</ul>
      </div>

      <div className="hidden md:flex items-center gap-3">
        {!user ? (
          <>
            <Link
              to="/login"
              className="px-5 py-2 rounded-lg border border-[#3BB273] text-[#3BB273] hover:bg-[#3BB273] hover:text-white transition-all"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-5 py-2 rounded-lg bg-[#3BB273] text-white hover:bg-[#34A267] transition-all"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="cursor-pointer">
              <img
                src={user.photoURL || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-[#3BB273] object-cover"
              />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-3 shadow bg-white rounded-xl w-64 border border-[#E5E7EB]"
            >
              <li className="mb-2">
                <div className="flex items-center gap-3">
                  <img
                    src={user.photoURL || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border border-[#3BB273] object-cover"
                  />
                  <div className="text-sm">
                    <p className="font-semibold text-[#1F2937]">{user.displayName || "User"}</p>
                    <p className="text-[#6B7280]">{user.email}</p>
                  </div>
                </div>
              </li>
              <li>
                <button onClick={logOut} className="text-left text-[#EF4444]">
                  Log out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="md:hidden flex items-center gap-3">

        {user && (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="cursor-pointer">
              <img
                src={user.photoURL || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
                alt="Profile"
                className="w-8 h-8 rounded-full border border-[#3BB273] object-cover"
              />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-3 shadow bg-white rounded-xl w-60 border border-[#E5E7EB]"
            >
              <li className="mb-2">
                <div className="flex items-center gap-2">
                  <img
                    src={user.photoURL || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border border-[#3BB273] object-cover"
                  />
                  <div className="text-sm">
                    <p className="font-semibold text-[#1F2937]">{user.displayName || "User"}</p>
                    <p className="text-[#6B7280] truncate">{user.email}</p>
                  </div>
                </div>
              </li>
              <li>
                <button onClick={logOut} className="text-left text-[#EF4444]">
                  Log out
                </button>
              </li>
            </ul>
          </div>
        )}

        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost text-[#3BB273] text-2xl">☰</label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[10] p-3 shadow bg-white rounded-box w-56 text-[#1F2937]"
          >
            {navLinks}
            {!user && (
              <div className="mt-2 border-t border-gray-200 pt-2">
                <Link to="/login" className="block py-1 text-[#3BB273] hover:underline">Login</Link>
                <Link to="/register" className="block py-1 text-[#3BB273] hover:underline">Sign Up</Link>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
