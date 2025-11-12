import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import axios from "axios";

const Overview = () => {
  const { user } = useContext(AuthContext) || {};
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    const fetchTransactions = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/transactions?email=${user.email}`
        );
        const transactions = res.data;

        const income = transactions
          .filter((t) => t.type === "income")
          .reduce((sum, t) => sum + Number(t.amount || 0), 0);

        const expense = transactions
          .filter((t) => t.type === "expense")
          .reduce((sum, t) => sum + Number(t.amount || 0), 0);

        setTotalIncome(income);
        setTotalExpense(expense);
        setBalance(income - expense);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load overview data", error);
      }
    };

    fetchTransactions();
  }, [user?.email]);

  if (loading) {
    return (
      <section className="bg-[#F7FAFC] py-16 px-6 md:px-20 text-center">
        <p className="text-[#3BB273] text-lg font-medium">Loading overview...</p>
      </section>
    );
  }

  return (
    <section className="bg-[#F7FAFC] py-16 px-6 md:px-20">
      <h2 className="text-3xl font-semibold text-[#1F2937] mb-10 text-center">
        Financial Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-8 text-center hover:shadow-md transition-all duration-300">
          <h3 className="text-lg font-medium text-[#6B7280] mb-1">
            Total Income
          </h3>
          {user ? (
            <p className="text-4xl font-bold text-[#10B981]">
              ${totalIncome.toLocaleString()}
            </p>
          ) : (
            <p className="text-[#6B7280] text-base font-medium">
              Login to see total income
            </p>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-8 text-center hover:shadow-md transition-all duration-300">
          <h3 className="text-lg font-medium text-[#6B7280] mb-1">
            Total Expense
          </h3>
          {user ? (
            <p className="text-4xl font-bold text-[#EF4444]">
              ${totalExpense.toLocaleString()}
            </p>
          ) : (
            <p className="text-[#6B7280] text-base font-medium">
              Login to see total expense
            </p>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-8 text-center hover:shadow-md transition-all duration-300">
          <h3 className="text-lg font-medium text-[#6B7280] mb-1">
            Total Balance
          </h3>
          {user ? (
            <p
              className={`text-4xl font-bold ${balance >= 0 ? "text-[#3BB273]" : "text-[#EF4444]"
                }`}
            >
              ${balance.toLocaleString()}
            </p>
          ) : (
            <p className="text-[#6B7280] text-base font-medium">
              Login to see your balance
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Overview;
