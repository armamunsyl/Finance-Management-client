import React from 'react'

const AddTrans = () => {
  return (
    <div className="min-h-screen bg-[#F7FAFC] flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-2xl border border-[#E5E7EB]">
        <h2 className="text-3xl font-semibold text-center text-[#1F2937] mb-8">
          Add New Transaction
        </h2>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1">
              Type (Income / Expense)
            </label>
            <select className="w-full border border-[#D1D5DB] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#3BB273] outline-none">
              <option>Select Type</option>
              <option>Income</option>
              <option>Expense</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1">
              Category
            </label>
            <select className="w-full border border-[#D1D5DB] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#3BB273] outline-none">
              <option>Select Category</option>
              <option>Food</option>
              <option>Transport</option>
              <option>Education</option>
              <option>Shopping</option>
              <option>Home</option>
              <option>Others</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1">
              Amount
            </label>
            <input
              type="number"
              placeholder="Enter amount"
              className="w-full border border-[#D1D5DB] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#3BB273] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1">
              Description
            </label>
            <textarea
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
                value="John Doe"
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
                value="johndoe@gmail.com"
                readOnly
                className="w-full border border-[#D1D5DB] rounded-lg px-4 py-2 bg-[#F3F4F6] text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>
          <button
            type="button"
            className="w-full bg-[#3BB273] text-white py-2 rounded-lg font-semibold hover:bg-[#34A267] transition-all duration-200"
          >
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddTrans