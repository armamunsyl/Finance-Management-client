import React, { useContext, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import axios from "axios";

const AddTrans = () => {
  const { user } = useContext(AuthContext) || {};
  const [formData, setFormData] = useState({
    type: "",
    category: "",
    amount: "",
    description: "",
    date: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const newTransaction = {
      ...formData,
      userEmail: user?.email || "test@example.com",
      userName: user?.displayName || "Test User",
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/transactions",
        newTransaction
      );

      if (res.data.insertedId) {
        setMessage("✅ Transaction added successfully!");
        setFormData({
          type: "",
          category: "",
          amount: "",
          description: "",
          date: "",
        });
      } else {
        setMessage("Failed to add transaction. Try again.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error. Please check connection.");
    }
  };

  const incomeCategories = ["Job", "Business", "Other"];
  const expenseCategories = [
    "Food",
    "Transport",
    "Education",
    "Shopping",
    "Home",
    "Freelance",
    "Entertainment",
    "Health",
    "Investment",
    "Others",
  ];

  return (
    <div className="min-h-screen bg-[#F7FAFC] flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-2xl border border-[#E5E7EB]">
        <h2 className="text-3xl font-semibold text-center text-[#1F2937] mb-8">
          Add New Transaction
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1">
              Type (Income / Expense)
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full border border-[#D1D5DB] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#3BB273] outline-none"
            >
              <option value="">Select Type</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>


          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              disabled={!formData.type}
              className="w-full border border-[#D1D5DB] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#3BB273] outline-none bg-white disabled:bg-gray-100"
            >
              <option value="">Select Category</option>
              {(formData.type === "income"
                ? incomeCategories
                : expenseCategories
              ).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>


          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              placeholder="Enter amount"
              className="w-full border border-[#D1D5DB] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#3BB273] outline-none"
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a short note..."
              className="w-full border border-[#D1D5DB] rounded-lg px-4 py-2 h-24 resize-none focus:ring-2 focus:ring-[#3BB273] outline-none"
            ></textarea>
          </div>


          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full border border-[#D1D5DB] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#3BB273] outline-none"
            />
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-1">
                User Name (Read-only)
              </label>
              <input
                type="text"
                value={user?.displayName || "Test User"}
                readOnly
                className="w-full border border-[#D1D5DB] rounded-lg px-4 py-2 bg-[#F3F4F6] text-gray-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#374151] mb-1">
                User Email (Read-only)
              </label>
              <input
                type="text"
                value={user?.email || "test@example.com"}
                readOnly
                className="w-full border border-[#D1D5DB] rounded-lg px-4 py-2 bg-[#F3F4F6] text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>


          <button
            type="submit"
            className="w-full bg-[#3BB273] text-white py-2 rounded-lg font-semibold hover:bg-[#34A267] transition-all duration-200"
          >
            Add Transaction
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 font-medium text-[#374151]">{message}</p>
        )}
      </div>
    </div>
  );
};

export default AddTrans;
