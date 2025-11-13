import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#3BB273", "#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#6366F1"];

const Report = () => {
  const { user } = useContext(AuthContext) || {};
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    const loadData = async () => {
      const res = await axios.get(
        `https://finease-server-three.vercel.app/transactions?email=${user.email}`
      );
      setTransactions(res.data);
    };

    loadData();
  }, [user?.email]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
        Please log in to view reports.
      </div>
    );
  }
  const categoryTotals = transactions.reduce((acc, t) => {
    if (!acc[t.category]) acc[t.category] = 0;
    acc[t.category] += Number(t.amount);
    return acc;
  }, {});

  const pieData = Object.entries(categoryTotals).map(([key, value]) => ({
    name: key,
    value: value,
  }));
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const monthlyTotals = transactions.reduce((acc, t) => {
    const month = new Date(t.date).getMonth();
    acc[month] = (acc[month] || 0) + Number(t.amount);
    return acc;
  }, {});

  const barData = monthNames.map((month, index) => ({
    month,
    amount: monthlyTotals[index] || 0,
  }));

  return (
    <section className="min-h-screen bg-[#F7FAFC] px-6 md:px-20 py-12">
      <h2 className="text-3xl font-semibold text-center mb-10 text-[#1F2937]">
        Financial Reports
      </h2>

      <div className="bg-white border rounded-2xl p-6 mb-12 shadow-sm">
        <h3 className="text-xl font-semibold text-center mb-4">
          Category-wise Distribution
        </h3>
        <div className="w-full h-80">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={110}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white border rounded-2xl p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-center mb-4">
          Monthly Totals
        </h3>
        <div className="w-full h-80">
          <ResponsiveContainer>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#3BB273" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default Report;
