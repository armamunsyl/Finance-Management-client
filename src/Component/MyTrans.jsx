import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const MyTrans = () => {
  const { user } = useContext(AuthContext) || {};
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [selectedTrans, setSelectedTrans] = useState(null);

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

  const handleUpdateClick = (t) => {
    setSelectedTrans(t);
    setShowModal(true);
  };

  const handleViewClick = (t) => {
    setSelectedTrans(t);
    setViewModal(true);
  };

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This transaction will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#22C55E",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(
          `https://finease-server-three.vercel.app/transactions/${id}`
        );

        setTransactions(transactions.filter((t) => t._id !== id));

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Transaction removed successfully.",
          confirmButtonColor: "#22C55E",
        });
      }
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;
    const updated = {
      type: form.type.value,
      description: form.description.value,
      category: form.category.value,
      amount: Number(form.amount.value),
      date: form.date.value,
    };

    await axios.patch(
      `https://finease-server-three.vercel.app/transactions/${selectedTrans._id}`,
      updated
    );

    setTransactions(
      transactions.map((t) =>
        t._id === selectedTrans._id ? { ...t, ...updated } : t
      )
    );

    setShowModal(false);

    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: "Transaction updated successfully.",
      confirmButtonColor: "#22C55E",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl text-[#22C55E]">
        Loading your transactions...
      </div>
    );
  }

  return (
    <section className="bg-base-100 min-h-screen px-4 md:px-20 py-12">
      <h2 className="text-3xl font-semibold text-center mb-10 text-base-content">
        My Transactions
      </h2>

      <div className="hidden md:block overflow-x-auto max-w-6xl mx-auto bg-base-100 border border-base-300 rounded-2xl shadow">
        <table className="w-full border-collapse">
          <thead className="bg-[#22C55E] text-white">
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
                  className="border-b border-base-300 hover:bg-base-200 transition-all"
                >
                  <td className="py-3 px-4">{index + 1}</td>

                  <td
                    className={`py-3 px-4 font-medium ${
                      t.type === "income" ? "text-[#22C55E]" : "text-[#EF4444]"
                    }`}
                  >
                    {t.type}
                  </td>

                  <td className="py-3 px-4 text-base-content">{t.category}</td>

                  <td
                    className={`py-3 px-4 font-semibold ${
                      t.type === "income" ? "text-[#22C55E]" : "text-[#EF4444]"
                    }`}
                  >
                    {t.type === "income" ? "+" : "-"}
                    {t.amount} BDT
                  </td>

                  <td className="py-3 px-4 text-base-content">{t.date}</td>

                  <td className="py-3 px-4 text-center space-x-2">
                    <button
                      onClick={() => handleUpdateClick(t)}
                      className="px-3 py-1 rounded-md text-white"
                      style={{ backgroundColor: "#22C55E" }}
                    >
                      Update
                    </button>

                    <button
                      onClick={() => handleDeleteClick(t._id)}
                      className="px-3 py-1 bg-[#EF4444] text-white rounded-md"
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => handleViewClick(t)}
                      className="px-3 py-1 border rounded-md"
                      style={{
                        borderColor: "#22C55E",
                        color: "#22C55E",
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-base-content/60"
                >
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden flex flex-col gap-4 mt-6">
        {transactions.map((t) => (
          <div
            key={t._id}
            className="bg-base-100 border border-base-300 rounded-2xl shadow p-5"
          >
            <div className="flex justify-between mb-2">
              <p
                className={`font-semibold ${
                  t.type === "income" ? "text-[#22C55E]" : "text-[#EF4444]"
                }`}
              >
                {t.type}
              </p>

              <p
                className={`font-bold ${
                  t.type === "income" ? "text-[#22C55E]" : "text-[#EF4444]"
                }`}
              >
                {t.type === "income" ? "+" : "-"}
                {t.amount} BDT
              </p>
            </div>

            <p className="text-sm text-base-content">Category: {t.category}</p>
            <p className="text-sm text-base-content">Date: {t.date}</p>

            <div className="flex justify-between mt-3">
              <button
                onClick={() => handleUpdateClick(t)}
                className="px-3 py-1 text-white rounded-md text-sm"
                style={{ backgroundColor: "#22C55E" }}
              >
                Update
              </button>

              <button
                onClick={() => handleDeleteClick(t._id)}
                className="px-3 py-1 bg-[#EF4444] text-white rounded-md text-sm"
              >
                Delete
              </button>

              <button
                onClick={() => handleViewClick(t)}
                className="px-3 py-1 border rounded-md text-sm"
                style={{
                  borderColor: "#22C55E",
                  color: "#22C55E",
                }}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedTrans && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4 z-50">
          <div className="bg-base-100 border border-base-300 rounded-2xl shadow-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-3 text-2xl text-base-content"
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-4 text-center text-base-content">
              Update Transaction
            </h2>

            <form
              onSubmit={handleUpdate}
              className="space-y-4"
              onChange={(e) => {
                if (e.target.name === "type") {
                  setSelectedTrans({
                    ...selectedTrans,
                    type: e.target.value,
                  });
                }
              }}
            >
              <div>
                <label className="block mb-1 text-base-content">Type</label>
                <select
                  name="type"
                  value={selectedTrans.type}
                  onChange={(e) =>
                    setSelectedTrans({ ...selectedTrans, type: e.target.value })
                  }
                  className="w-full border border-base-300 bg-base-100 rounded-lg px-3 py-2"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-base-content">Category</label>
                <select
                  name="category"
                  value={selectedTrans.category}
                  onChange={(e) =>
                    setSelectedTrans({
                      ...selectedTrans,
                      category: e.target.value,
                    })
                  }
                  className="w-full border border-base-300 bg-base-100 rounded-lg px-3 py-2"
                >
                  {(selectedTrans.type === "income"
                    ? ["Job", "Business", "Other"]
                    : [
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
                      ]
                  ).map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 text-base-content">Amount</label>
                <input
                  type="number"
                  name="amount"
                  defaultValue={selectedTrans.amount}
                  className="w-full border border-base-300 bg-base-100 rounded-lg px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-base-content">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={selectedTrans.description}
                  className="w-full border border-base-300 bg-base-100 rounded-lg px-3 py-2 h-20"
                ></textarea>
              </div>

              <div>
                <label className="block mb-1 text-base-content">Date</label>
                <input
                  type="date"
                  name="date"
                  defaultValue={selectedTrans.date}
                  className="w-full border border-base-300 bg-base-100 rounded-lg px-3 py-2"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-lg text-white font-semibold mt-3"
                style={{
                  backgroundColor: "#22C55E",
                  border: "1px solid #22C55E",
                }}
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {viewModal && selectedTrans && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4 z-50">
          <div className="bg-base-100 border border-base-300 rounded-2xl shadow-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setViewModal(false)}
              className="absolute right-4 top-3 text-2xl text-base-content"
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-4 text-center text-base-content">
              Transaction Details
            </h2>

            <div className="space-y-3">
              <p className="text-base-content">
                <span className="font-semibold">Type:</span> {selectedTrans.type}
              </p>

              <p className="text-base-content">
                <span className="font-semibold">Category:</span>{" "}
                {selectedTrans.category}
              </p>

              <p
                className={`font-bold ${
                  selectedTrans.type === "income"
                    ? "text-[#22C55E]"
                    : "text-[#EF4444]"
                }`}
              >
                Amount:{" "}
                {selectedTrans.type === "income" ? "+" : "-"}
                {selectedTrans.amount} BDT
              </p>

              <p className="text-base-content">
                <span className="font-semibold">Date:</span>{" "}
                {selectedTrans.date}
              </p>

              <p className="text-base-content">
                <span className="font-semibold">Description:</span>{" "}
                {selectedTrans.description}
              </p>
            </div>

            <div className="mt-6 p-4 bg-base-200 rounded-xl border border-base-300">
              <p className="font-semibold mb-2 text-base-content">
                Total with this category
              </p>

              <p className="text-lg font-bold text-[#22C55E]">
                {
                  transactions
                    .filter(
                      (t) => t.category === selectedTrans.category
                    )
                    .reduce((sum, t) => sum + Number(t.amount), 0)
                }{" "}
                BDT
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyTrans;
