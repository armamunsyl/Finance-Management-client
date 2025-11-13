const FinancialPlanning = () => {
    return (
        <section className="bg-base-100 py-16 px-6 md:px-20">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-3xl font-semibold text-base-content mb-6">
                    Why Financial Planning Matters
                </h2>

                <p className="text-base-content/70 max-w-2xl mx-auto mb-12">
                    A good financial plan not only ensures stability but also helps you build a secure and independent future.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
                    
                    <div className="bg-base-200 border border-base-300 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
                        <h3 className="text-xl font-semibold text-[#22C55E] mb-2">
                            1. Manage Uncertainty
                        </h3>
                        <p className="text-base-content/70 text-sm">
                            Financial planning helps you prepare for emergencies, ensuring that unexpected events don’t ruin your budget.
                        </p>
                    </div>

                    <div className="bg-base-200 border border-base-300 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
                        <h3 className="text-xl font-semibold text-[#22C55E] mb-2">
                            2. Achieve Long-term Goals
                        </h3>
                        <p className="text-base-content/70 text-sm">
                            It allows you to plan ahead for education, investments, or retirement — making your dreams achievable step by step.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FinancialPlanning;
