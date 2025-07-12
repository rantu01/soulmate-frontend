import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

const stripePromise = loadStripe(
  "pk_test_51Rif1aQMQmOx02eF1FJqrzqUAN8z5hbwwWKqDICdb0rJXMnZ9klfoakD1188k7KEbvvsYukF3VzvPzvMXhgAx7fe00mwlQvrs4"
);

const CheckoutForm = ({ biodataId, userEmail, jwtToken }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    try {
      // Create Payment Intent on backend
      const res = await fetch("https://matrimony-backend-p3ok.onrender.com/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({ amount: 500 }), // amount in cents or smallest unit
      });
      const { clientSecret, message } = await res.json();

      if (!res.ok) throw new Error(message || "Payment Intent Error");

      const card = elements.getElement(CardElement);
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: { email: userEmail },
        },
      });

      if (paymentResult.error) throw new Error(paymentResult.error.message);

      if (paymentResult.paymentIntent.status === "succeeded") {
        // Record payment in backend
        const recordRes = await fetch("https://matrimony-backend-p3ok.onrender.com/api/payments/record", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({
            biodataId: Number(biodataId),
            userEmail,
            amount: 500, // same amount as charged
          }),
        });
        const recordData = await recordRes.json();
        if (!recordRes.ok || !recordData.success) {
          throw new Error(recordData.message || "Failed to record payment");
        }

        // Submit contact request after payment recorded
        const reqRes = await fetch("https://matrimony-backend-p3ok.onrender.com/api/request-contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({ biodataId: Number(biodataId), userEmail }),
        });

        const reqData = await reqRes.json();

        if (!reqRes.ok || !reqData.success) {
          throw new Error(reqData.message || "Request Submission Failed");
        }

        Swal.fire({
          icon: "success",
          title: "Payment Successful",
          text: "Contact request submitted and pending admin approval.",
          confirmButtonColor: "#6366f1",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Request Contact Info
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Biodata ID</label>
        <input
          type="text"
          value={biodataId}
          readOnly
          className="w-full px-4 py-2 border rounded-md bg-gray-50"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Email</label>
        <input
          type="email"
          value={userEmail}
          readOnly
          className="w-full px-4 py-2 border rounded-md bg-gray-50"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Card Details</label>
        <div className="p-4 border rounded-md">
          <CardElement />
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className={`w-full py-3 text-white font-semibold rounded-md transition-colors duration-300 ${
          loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {loading ? "Processing..." : "Submit & Pay $5"}
      </button>
    </form>
  );
};

const CheckoutContactRequest = () => {
  const { currentUser, jwtToken } = useAuth();
  const navigate = useNavigate();
  const { biodataId } = useParams();

  useEffect(() => {
    if (!currentUser) navigate("/login");
  }, [currentUser, navigate]);

  if (!currentUser || !jwtToken) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-indigo-100 flex items-center justify-center px-4 py-12">
      <Elements stripe={stripePromise}>
        <CheckoutForm biodataId={biodataId} userEmail={currentUser.email} jwtToken={jwtToken} />
      </Elements>
    </div>
  );
};

export default CheckoutContactRequest;
