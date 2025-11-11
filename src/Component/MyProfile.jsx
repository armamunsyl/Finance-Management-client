import React from 'react'

const MyProfile = () => {
  return (
    <section className="bg-[#F7FAFC] min-h-screen px-4 md:px-20 py-12 flex justify-center items-center">
      <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-md w-full max-w-md p-8 text-center">
        {/* Profile Photo */}
        <div className="flex justify-center mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="User Avatar"
            className="w-28 h-28 rounded-full border-4 border-[#3BB273] shadow-sm"
          />
        </div>

        {/* User Info */}
        <h2 className="text-2xl font-semibold text-[#1F2937] mb-1">John Doe</h2>
        <p className="text-[#6B7280] mb-6">johndoe@gmail.com</p>

        {/* Static Info */}
        <div className="text-left space-y-3 mb-8">
          <div className="flex justify-between">
            <span className="font-medium text-[#374151]">Name:</span>
            <span className="text-[#6B7280]">John Doe</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-[#374151]">Email:</span>
            <span className="text-[#6B7280]">johndoe@gmail.com</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button className="w-full bg-[#3BB273] text-white py-2 rounded-lg font-semibold hover:bg-[#34A267] transition-all duration-200">
            Update Profile
          </button>
          <button className="w-full bg-[#EF4444] text-white py-2 rounded-lg font-semibold hover:bg-[#DC2626] transition-all duration-200">
            Logout
          </button>
        </div>
      </div>
    </section>
  );
};

export default MyProfile;

