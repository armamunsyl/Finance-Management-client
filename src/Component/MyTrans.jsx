import React, { useEffect, useState } from 'react'

const MyTrans = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showModal]);

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
            <tr className="border-b hover:bg-[#F9FAFB] transition-all duration-200">
              <td className="py-3 px-4">1</td>
              <td className="py-3 px-4 text-[#10B981] font-medium">Income</td>
              <td className="py-3 px-4 text-[#374151]">Freelance</td>
              <td className="py-3 px-4 text-[#10B981] font-semibold">+$1200</td>
              <td className="py-3 px-4 text-[#6B7280]">2025-02-14</td>
              <td className="py-3 px-4 text-center space-x-2">
                <button
                  onClick={() => setShowModal(true)}
                  className="px-3 py-1 bg-[#3BB273] text-white rounded-md text-sm hover:bg-[#34A267] transition-all"
                >
                  Update
                </button>
                <button className="px-3 py-1 bg-[#EF4444] text-white rounded-md text-sm hover:bg-[#DC2626] transition-all">
                  Delete
                </button>
                <button className="px-3 py-1 border border-[#3BB273] text-[#3BB273] rounded-md text-sm hover:bg-[#3BB273] hover:text-white transition-all">
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm p-5">
          <div className="flex justify-between items-center mb-2">
            <p className="text-[#10B981] font-semibold">Income</p>
            <p className="text-[#10B981] font-bold">+$1200</p>
          </div>
          <p className="text-sm text-[#374151]">Category: Freelance</p>
          <p className="text-sm text-[#6B7280] mb-3">Date: 2025-02-14</p>
          <div className="flex justify-between">
            <button
              onClick={() => setShowModal(true)}
              className="px-3 py-1 bg-[#3BB273] text-white text-sm rounded-md hover:bg-[#34A267] transition-all"
            >
              Update
            </button>
            <button className="px-3 py-1 bg-[#EF4444] text-white text-sm rounded-md hover:bg-[#DC2626] transition-all">
              Delete
            </button>
            <button className="px-3 py-1 border border-[#3BB273] text-[#3BB273] text-sm rounded-md hover:bg-[#3BB273] hover:text-white transition-all">
              View
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto p-6 relative">

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-2xl"
              title="Close"
            >
              &times;
            </button>

            <h2 className="text-xl font-semibold text-center text-[#1F2937] mb-5">
              Update Transaction
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1">
                  Type
                </label>
                <select
                  defaultValue="Income"
                  className="w-full border border-[#D1D5DB] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#3BB273] outline-none"
                >
                  <option>Income</option>
                  <option>Expense</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1">
                  Description
                </label>
                <textarea
                  defaultValue="Payment received from freelance project."
                  className="w-full border border-[#D1D5DB] rounded-lg px-3 py-2 h-20 resize-none focus:ring-2 focus:ring-[#3BB273] outline-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1">
                  Category
                </label>
                <select
                  defaultValue="Freelance"
                  className="w-full border border-[#D1D5DB] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#3BB273] outline-none"
                >
                  <option>Food</option>
                  <option>Transport</option>
                  <option>Home</option>
                  <option>Education</option>
                  <option>Freelance</option>
                  <option>Others</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  defaultValue="1200"
                  className="w-full border border-[#D1D5DB] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#3BB273] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1">
                  Date
                </label>
                <input
                  type="date"
                  defaultValue="2025-02-14"
                  className="w-full border border-[#D1D5DB] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#3BB273] outline-none"
                />
              </div>

              <button
                type="button"
                className="w-full bg-[#3BB273] text-white py-2 rounded-lg font-semibold hover:bg-[#34A267] transition-all duration-200"
              >
                Update Transaction
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyTrans