import { Link } from "react-router";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#3BB273] text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div>
          <h2 className="text-2xl font-bold mb-2">FinEase</h2>
          <p className="text-sm opacity-90 leading-relaxed">
            Simplify your finances. Track income, expenses, and savings goals — 
            all in one easy dashboard.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm opacity-90">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/add-transaction" className="hover:underline">Add Transaction</Link></li>
            <li><Link to="/my-transactions" className="hover:underline">My Transactions</Link></li>
            <li><Link to="/reports" className="hover:underline">Reports</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-sm opacity-90">Email: support@finees.app</p>
          <p className="text-sm opacity-90">Phone: +880 1234 567 890</p>
          <div className="flex gap-4 mt-3 text-xl">
            <a href="#" className="hover:text-[#A6E3B8]"><FaLinkedin /></a>
            <a href="#" className="hover:text-[#A6E3B8]"><FaFacebook /></a>
            <a href="#" className="hover:text-[#A6E3B8]"><FaSquareXTwitter /></a>
          </div>
        </div>

      </div>

      <div className="border-t border-white/20 text-center py-4 text-sm opacity-90">
        © {new Date().getFullYear()} FinEase. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
