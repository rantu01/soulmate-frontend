import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FiDollarSign, FiCreditCard, FiTrendingUp } from "react-icons/fi";
import { PulseLoader } from "react-spinners";

const PaymentSummary = () => {
  const [totalPayments, setTotalPayments] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPaymentSummary = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("https://matrimony-backend-p3ok.onrender.com/api/payments/summary");
      if (!res.ok) throw new Error("Failed to fetch payment summary");
      const data = await res.json();
      setTotalPayments(data.totalPayments || 0);
    } catch (error) {
      console.error("Payment summary error:", error);
      setError(error.message);
      Swal.fire({
        icon: "error",
        title: "Payment Data Unavailable",
        text: error.message || "Failed to load payment information",
        confirmButtonColor: "#6366f1",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentSummary();
  }, []);

  const totalRevenue = totalPayments * 5;

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <div className="flex items-center justify-center gap-3 mb-6">
        <FiDollarSign className="text-indigo-600 text-2xl" />
        <h2 className="text-2xl font-bold text-gray-800">Payment Dashboard</h2>
      </div>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center py-8">
          <PulseLoader color="#6366f1" size={12} />
          <p className="mt-4 text-gray-600">Loading payment data...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
          <button
            onClick={fetchPaymentSummary}
            className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <div className="bg-indigo-50 p-2 rounded-lg border border-indigo-100">
            <div className="flex items-center gap-3 mb-4">
              <FiCreditCard className="text-indigo-600 text-xl" />
              <h3 className=" font-semibold text-gray-700">Transactions</h3>
            </div>
            <div className="">
              <p className="text-3xl font-bold text-indigo-600">{totalPayments}</p>
              <p className="text-gray-500 mb-1">completed payments</p>
            </div>
          </div>

          <div className="bg-green-50 p-2 rounded-lg border border-green-100">
            <div className="flex items-center gap-3 mb-4">
              <FiTrendingUp className="text-green-600 text-xl" />
              <h3 className="text-lg font-semibold text-gray-700">Revenue</h3>
            </div>
            <div className="">
              <p className="text-3xl font-bold text-green-600">${totalRevenue.toFixed(2)}</p>
              <p className="text-gray-500 mb-1">total earned</p>
            </div>
            <div className="mt-3 text-sm text-gray-500">
              <p>Based on $5 per transaction</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentSummary;