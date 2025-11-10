import React from 'react'

const Overview = () => {
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
          <p className="text-4xl font-bold text-[#10B981]">$12,500</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-8 text-center hover:shadow-md transition-all duration-300">
         
          <h3 className="text-lg font-medium text-[#6B7280] mb-1">
            Total Expense
          </h3>
          <p className="text-4xl font-bold text-[#EF4444]">$7,300</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-8 text-center hover:shadow-md transition-all duration-300">
       
          <h3 className="text-lg font-medium text-[#6B7280] mb-1">
            Total Balance
          </h3>
          <p className="text-4xl font-bold text-[#3BB273]">$5,200</p>
        </div>
      </div>
    </section>
  );
};

export default Overview;
