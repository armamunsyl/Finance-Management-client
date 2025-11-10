import { Link } from "react-router";
import bannering from "../assets/banner-right.png"

const Home = () => {
  return (
    <section className="bg-[#F7FAFC] min-h-[80vh] flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-12">
      
      <div className="md:w-1/2 text-center md:text-left space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1F2937] leading-tight">
          Take Control of Your <span className="text-[#3BB273]">Finances</span>
        </h1>
        <p className="text-[#6B7280] text-lg max-w-md mx-auto md:mx-0">
          FinEase helps you track income, expenses, and savings in one smart dashboard — 
          stay organized and grow your money effortlessly.
        </p>
        <div className="flex justify-center md:justify-start gap-4">
          <Link
            to="/add-transaction"
            className="px-6 py-3 bg-[#3BB273] text-white font-medium rounded-lg shadow-md hover:bg-[#34A267] transition-all duration-200"
          >
            Get Started
          </Link>
          <Link
            to="/reports"
            className="px-6 py-3 border border-[#3BB273] text-[#3BB273] font-medium rounded-lg hover:bg-[#3BB273] hover:text-white transition-all duration-200"
          >
            View Reports
          </Link>
        </div>
      </div>
      <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
        <img
          src={bannering}
          alt="Finance Illustration"
          className="w-90 md:w-[420px] drop-shadow-lg"
        />
      </div>
    </section>
  );
};

export default Home;
