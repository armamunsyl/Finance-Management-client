import { Link, NavLink } from "react-router";

const Navbar = () => {
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
        <ul className="flex gap-8 text-[16px] font-medium">
          {navLinks}
        </ul>
      </div>

      <div className="hidden md:flex gap-3">
        <Link
          to="/login"
          className="px-5 py-2 rounded-lg border border-[#3BB273] text-[#3BB273] hover:bg-[#3BB273] hover:text-white transition-all duration-200"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-5 py-2 rounded-lg bg-[#3BB273] text-white hover:bg-[#34A267] transition-all duration-200"
        >
          Sign Up
        </Link>
      </div>
      <div className="md:hidden dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost text-[#3BB273] text-2xl">
          ☰
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[10] p-3 shadow bg-white rounded-box w-52 text-[#1F2937]"
        >
          {navLinks}
          <div className="mt-2 border-t border-gray-200 pt-2">
            <Link
              to="/login"
              className="block py-1 text-[#3BB273] hover:underline"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="block py-1 text-[#3BB273] hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
