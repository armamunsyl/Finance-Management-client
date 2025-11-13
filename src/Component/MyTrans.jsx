import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import axios from "axios";

const MyTrans = () => {
  const { user } = useContext(AuthContext) || {};
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedTrans, setSelectedTrans] = useState(null);
  const [viewModal, setViewModal] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showModal || viewModal ? "hidden" : "auto";
  }, [showModal, viewModal]);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user?.email) return;
      const res = await axios.get(
        `https://finease-server-three.vercel.app/transactions?email=${user.email}`
      );
      setTransactions(res.data);
      setLoading(false);
    };
    fetchTransactions();
  }, [user?.email]);

  const handleUpdateClick = (transaction) => {
    setSelectedTrans(transaction);
    setShowModal(true);
  };

  const handleViewClick = (transaction) => {
    setSelectedTrans(transaction);
    setViewModal(true);
  };

  const handleDeleteClick = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;
    await axios.delete(`https://finease-server-three.vercel.app/transactions/${id}`);
    const updatedList = transactions.filter((t) => t._id !== id);
    setTransactions(updatedList);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updated = {
      type: form.type.value,
      description: form.description.value,
      category: form.category.value,
      amount: parseFloat(form.amount.value),
      date: form.date.value,
    };
    await axios.patch(
      `https://finease-server-three.vercel.app/transactions/${selectedTrans._id}`,
      updated
    );
    const updatedList = transactions.map((t) =>
      t._id === selectedTrans._id ? { ...t, ...updated } : t
    );
    setTransactions(updatedList);
    setShowModal(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-lg text-[#3BB273]">
        Loading your transactions...
      </div>
    );
  }

  return (
    <section className="bg-[#F7FAFC] min-h-screen px-4 md:px-20 py-12 relative">
      <h2 className="text-3xl font-semibold text-[#1F2937] mb-10 text-center">
        My Transactions
      </h2>

      <div className="hidden md:block overflow-x-auto max-w-6xl mx-auto bg-white border border-[#E5E7EB] rounded-2xl shadow-sm">
        <table className="w-full border-collapse">
          <thead className="bg-[#3BB273] text-white">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((t, index) => (
                <tr
                  key={t._id}
                  className="border-b hover:bg-[#F9FAFB] transition-all duration-200"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td
                    className={`py-3 px-4 font-medium ${t.type === "income" ? "text-[#10B981]" : "text-[#EF4444]"
                      }`}
                  >
                    {t.type}
                  </td>
                  <td className="py-3 px-4 text-[#374151]">{t.category}</td>
                  <td
                    className={`py-3 px-4 font-semibold ${t.type === "income" ? "text-[#10B981]" : "text-[#EF4444]"
                      }`}
                  >
                    {t.type === "income" ? "+" : "-"}{t.amount} BDT
                  </td>
                  <td className="py-3 px-4 text-[#6B7280]">{t.date}</td>
                  <td className="py-3 px-4 text-center space-x-2">
                    <button
                      onClick={() => handleUpdateClick(t)}
                      className="px-3 py-1 bg-[#3BB273] text-white rounded-md text-sm hover:bg-[#34A267]"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteClick(t._id)}
                      className="px-3 py-1 bg-[#EF4444] text-white rounded-md text-sm hover:bg-[#DC2626]"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleViewClick(t)}
                      className="px-3 py-1 border border-[#3BB273] text-[#3BB273] rounded-md text-sm hover:bg-[#3BB273] hover:text-white"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-[#6B7280]">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden flex flex-col gap-4">
        {transactions.length > 0 ? (
          transactions.map((t) => (
            <div
              key={t._id}
              className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm p-5"
            >
              <div className="flex justify-between mb-2">
                <p
                  className={`font-semibold ${t.type === "income" ? "text-[#10B981]" : "text-[#EF4444]"
                    }`}
                >
                  {t.type}
                </p>
                <p
                  className={`font-bold ${t.type === "income" ? "text-[#10B981]" : "text-[#EF4444]"
                    }`}
                >
                  {t.type === "income" ? "+" : "-"}{t.amount} BDT
                </p>
              </div>
              <p className="text-sm text-[#374151]">Category: {t.category}</p>
              <p className="text-sm text-[#6B7280] mb-3">Date: {t.date}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleUpdateClick(t)}
                  className="px-3 py-1 bg-[#3BB273] text-white text-sm rounded-md hover:bg-[#34A267]"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteClick(t._id)}
                  className="px-3 py-1 bg-[#EF4444] text-white text-sm rounded-md hover:bg-[#DC2626]"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleViewClick(t)}
                  className="px-3 py-1 border border-[#3BB273] text-[#3BB273] text-sm rounded-md hover:bg-[#3BB273] hover:text-white"
                >
                  View
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-[#6B7280]">No transactions found</p>
        )}
      </div>

      {showModal && selectedTrans && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-2xl"
            >
              &times;
            </button>

            <h2 className="text-xl font-semibold text-center mb-5">
              Update Transaction
            </h2>

            <form
              className="space-y-4"
              onSubmit={handleUpdate}
              onChange={(e) => {
                if (e.target.name === "type") {
                  setSelectedTrans({ ...selectedTrans, type: e.target.value });
                }
              }}
            >
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  name="type"
                  value={selectedTrans.type}
                  onChange={(e) =>
                    setSelectedTrans({ ...selectedTrans, type: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#3BB273]"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  defaultValue={selectedTrans.description}
                  className="w-full border rounded-lg px-3 py-2 h-20 resize-none focus:ring-2 focus:ring-[#3BB273]"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  name="category"
                  defaultValue={selectedTrans.category}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#3BB273]"
                >
                  {selectedTrans.type === "income" ? (
                    <>
                      <option>Job</option>
                      <option>Business</option>
                      <option>Other</option>
                    </>
                  ) : (
                    <>
                      <option>Food</option>
                      <option>Transport</option>
                      <option>Education</option>
                      <option>Home</option>
                      <option>Freelance</option>
                      <option>Entertainment</option>
                      <option>Health</option>
                      <option>Investment</option>
                      <option>Others</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Amount</label>
                <input
                  type="number"
                  name="amount"
                  defaultValue={selectedTrans.amount}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#3BB273]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  defaultValue={selectedTrans.date}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#3BB273]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#3BB273] text-white py-2 rounded-lg font-semibold hover:bg-[#34A267] transition-all duration-200"
              >
                Update Transaction
              </button>
            </form>
          </div>
        </div>
      )}
      {viewModal && selectedTrans && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">

            <button
              onClick={() => setViewModal(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-2xl"
            >
              &times;
            </button>

            <h2 className="text-xl font-semibold text-center mb-5">
              Transaction Details
            </h2>

            {(() => {
              const totalCategoryAmount = transactions
                .filter(
                  (t) =>
                    t.category === selectedTrans.category &&
                    t.type === selectedTrans.type
                )
                .reduce((sum, t) => sum + Number(t.amount), 0);

              return (
                <div className="space-y-2 text-[#374151]">

                  <p><strong>Type:</strong> {selectedTrans.type}</p>

                  <p><strong>Category:</strong> {selectedTrans.category}</p>

                  <p><strong>Amount:</strong> {selectedTrans.amount} BDT</p>

                  <p><strong>Date:</strong> {selectedTrans.date}</p>

                  <p><strong>Description:</strong> {selectedTrans.description}</p>

                  <p className="pt-3 mt-3 border-t">
                    <strong>Total Amount of this Category:</strong>{" "}
                    {totalCategoryAmount} BDT
                  </p>

                </div>
              );
            })()}

          </div>
        </div>
      )}
    </section>
  );
};

export default MyTrans;
