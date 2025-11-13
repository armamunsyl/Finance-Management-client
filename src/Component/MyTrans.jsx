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

  // Fetch transactions
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
      cancelButtonColor: "#3BB273",
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
          confirmButtonColor: "#3BB273",
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
      confirmButtonColor: "#3BB273",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl text-[#3BB273]">
        Loading your transactions...
      </div>
    );
  }

  return (
    <section className="bg-[#F7FAFC] min-h-screen px-4 md:px-20 py-12 relative">
      <h2 className="text-3xl font-semibold text-center mb-10">
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
                  className="border-b hover:bg-[#F9FAFB] transition-all"
                >
                  <td className="py-3 px-4">{index + 1}</td>

                  <td
                    className={`py-3 px-4 font-medium ${
                      t.type === "income" ? "text-[#10B981]" : "text-[#EF4444]"
                    }`}
                  >
                    {t.type}
                  </td>

                  <td className="py-3 px-4">{t.category}</td>

                  <td
                    className={`py-3 px-4 font-semibold ${
                      t.type === "income" ? "text-[#10B981]" : "text-[#EF4444]"
                    }`}
                  >
                    {t.type === "income" ? "+" : "-"}
                    {t.amount} BDT
                  </td>

                  <td className="py-3 px-4">{t.date}</td>

                  <td className="py-3 px-4 text-center space-x-2">
                    <button
                      onClick={() => handleUpdateClick(t)}
                      className="px-3 py-1 bg-[#3BB273] text-white rounded-md"
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
                      className="px-3 py-1 border border-[#3BB273] text-[#3BB273] rounded-md"
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
                  className="text-center py-6 text-[#6B7280]"
                >
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="md:hidden flex flex-col gap-4">
        {transactions.map((t) => (
          <div
            key={t._id}
            className="bg-white border rounded-2xl shadow-sm p-5"
          >
            <div className="flex justify-between mb-2">
              <p
                className={`font-semibold ${
                  t.type === "income" ? "text-[#10B981]" : "text-[#EF4444]"
                }`}
              >
                {t.type}
              </p>

              <p
                className={`font-bold ${
                  t.type === "income" ? "text-[#10B981]" : "text-[#EF4444]"
                }`}
              >
                {t.type === "income" ? "+" : "-"}
                {t.amount} BDT
              </p>
            </div>

            <p className="text-sm">Category: {t.category}</p>
            <p className="text-sm">Date: {t.date}</p>

            <div className="flex justify-between mt-3">
              <button
                onClick={() => handleUpdateClick(t)}
                className="px-3 py-1 bg-[#3BB273] text-white rounded-md text-sm"
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
                className="px-3 py-1 border border-[#3BB273] text-[#3BB273] rounded-md text-sm"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
      {showModal && selectedTrans && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-3 text-2xl"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-4 text-center">
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
                <label className="block mb-1">Type</label>
                <select
                  name="type"
                  value={selectedTrans.type}
                  onChange={(e) =>
                    setSelectedTrans({ ...selectedTrans, type: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded-lg"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

              <div>
                <label className="block mb-1">Description</label>
                <textarea
                  name="description"
                  defaultValue={selectedTrans.description}
                  className="w-full border px-3 py-2 rounded-lg h-20"
                ></textarea>
              </div>

              <div>
                <label className="block mb-1">Category</label>
                <select
                  name="category"
                  defaultValue={selectedTrans.category}
                  className="w-full border px-3 py-2 rounded-lg"
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
                <label className="block mb-1">Amount</label>
                <input
                  type="number"
                  name="amount"
                  defaultValue={selectedTrans.amount}
                  className="w-full border px-3 py-2 rounded-lg"
                />
              </div>

              <div>
                <label className="block mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  defaultValue={selectedTrans.date}
                  className="w-full border px-3 py-2 rounded-lg"
                />
              </div>

              <button className="w-full bg-[#3BB273] text-white py-2 rounded-lg mt-2 font-semibold">
                Update Transaction
              </button>
            </form>
          </div>
        </div>
      )}
      {viewModal && selectedTrans && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative">

            <button
              onClick={() => setViewModal(false)}
              className="absolute right-4 top-3 text-2xl"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-4 text-center">
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
                <div className="space-y-2">
                  <p><strong>Type:</strong> {selectedTrans.type}</p>
                  <p><strong>Category:</strong> {selectedTrans.category}</p>
                  <p><strong>Amount:</strong> {selectedTrans.amount} BDT</p>
                  <p><strong>Date:</strong> {selectedTrans.date}</p>
                  <p><strong>Description:</strong> {selectedTrans.description}</p>

                  <p className="border-t pt-3 mt-3">
                    <strong>Total Amount of this Category: </strong>
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
