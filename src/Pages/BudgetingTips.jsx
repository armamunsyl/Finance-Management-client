const BudgetingTips = () => {
    return (
        <section className="bg-white py-16 px-6 md:px-20">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-3xl font-semibold text-[#1F2937] mb-6">
                    Smart Budgeting Tips
                </h2>
                <p className="text-[#6B7280] max-w-2xl mx-auto mb-10">
                    Learn simple yet powerful habits to manage your income and expenses effectively.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-[#F7FAFC] border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-md transition-all duration-300">
                        <h3 className="text-xl font-semibold text-[#3BB273] mb-2">Track Every Expense</h3>
                        <p className="text-[#6B7280] text-sm">
                            Keep a daily record of all your expenses — even the small ones. It helps you identify
                            unnecessary spending and plan better.
                        </p>
                    </div>

                    <div className="bg-[#F7FAFC] border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-md transition-all duration-300">
                        <h3 className="text-xl font-semibold text-[#3BB273] mb-2">Set Monthly Goals</h3>
                        <p className="text-[#6B7280] text-sm">
                            Decide your saving and spending targets every month. Consistency builds strong financial control.
                        </p>
                    </div>

                    <div className="bg-[#F7FAFC] border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-md transition-all duration-300">
                        <h3 className="text-xl font-semibold text-[#3BB273] mb-2">Prioritize Needs Over Wants</h3>
                        <p className="text-[#6B7280] text-sm">
                            Spend on what's essential first — lifestyle upgrades can wait until after your savings goal is met.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BudgetingTips;
