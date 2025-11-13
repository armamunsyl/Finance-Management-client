import React, { useContext, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const AddTrans = () => {
  const { user } = useContext(AuthContext) || {};
  const [formData, setFormData] = useState({
    type: "",
    category: "",
    amount: "",
    description: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTransaction = {
      ...formData,
      userEmail: user?.email,
      userName: user?.displayName,
    };

    try {
      const res = await axios.post(
        "https://finease-server-three.vercel.app/transactions",
        newTransaction
      );

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Transaction Added!",
          text: "Your transaction was saved successfully.",
          confirmButtonColor: "#3BB273",
        });

        setFormData({
          type: "",
          category: "",
          amount: "",
          description: "",
          date: "",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Could not add transaction. Try again.",
        confirmButtonColor: "#EF4444",
      });
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
            <label className="block mb-1">Type</label>
            <select
              name="type"
              required
              value={formData.type}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select Type</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Category</label>
            <select
              name="category"
              required
              disabled={!formData.type}
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select Category</option>
              {(formData.type === "income"
                ? incomeCategories
                : expenseCategories
              ).map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1">Amount</label>
            <input
              type="number"
              required
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 h-20"
            ></textarea>
          </div>

          <div>
            <label className="block mb-1">Date</label>
            <input
              type="date"
              required
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#3BB273] text-white py-2 rounded-lg font-semibold"
          >
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTrans;
