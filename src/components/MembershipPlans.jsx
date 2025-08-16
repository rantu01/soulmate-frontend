import { FaCheck, FaCrown, FaStar, FaGem } from "react-icons/fa";
import { motion } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useState } from "react";
import CheckoutContactRequest from "../pages/CheckoutContactRequest";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51Rif1aQMQmOx02eF1FJqrzqUAN8z5hbwwWKqDICdb0rJXMnZ9klfoakD1188k7KEbvvsYukF3VzvPzvMXhgAx7fe00mwlQvrs4"
);

const MembershipPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();

  const plans = [
    {
      name: "Basic",
      price: "Free",
      amount: 0, // Stripe amount in cents
      duration: "",
      description: "Essential features to start your journey",
      popular: false,
      features: [
        "Create a profile",
        "Browse limited profiles",
        "Send 5 interests/month",
        "Basic customer support",
      ],
      color: "from-gray-400 to-gray-500",
    },
    {
      name: "Gold",
      price: "₹999",
      amount: 99900, // Stripe takes amount in paisa (cents)
      duration: "/month",
      description: "For serious seekers",
      popular: true,
      features: [
        "Unlimited profile browsing",
        "Send unlimited interests",
        "Priority listing in searches",
        "Advanced matching filters",
        "Dedicated relationship manager",
      ],
      color: "from-amber-500 to-amber-600",
    },
    {
      name: "Platinum",
      price: "₹2,499",
      amount: 249900,
      duration: "/month",
      description: "VIP treatment for best results",
      popular: false,
      features: [
        "All Gold features",
        "Profile highlighted in searches",
        "Verified badge",
        "Exclusive matchmaking assistance",
        "Personalized date planning",
        "24/7 priority support",
      ],
      color: "from-purple-600 to-pink-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="bg-gradient-to-b from-white to-pink-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upgrade to unlock premium features and find your match faster
          </p>
        </div>

        {/* Plans Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative"
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                  <FaStar className="mr-2" /> MOST POPULAR
                </div>
              )}

              {/* Plan Card */}
              <div
                className={`h-full bg-white rounded-xl shadow-lg overflow-hidden border-2 ${
                  plan.popular ? "border-pink-500" : "border-white"
                }`}
              >
                {/* Plan Header */}
                <div
                  className={`bg-gradient-to-r ${plan.color} p-6 text-white`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold flex items-center">
                        {plan.name === "Platinum" && (
                          <FaCrown className="mr-2" />
                        )}
                        {plan.name === "Gold" && <FaGem className="mr-2" />}
                        {plan.name}
                      </h3>
                      <p className="opacity-90">{plan.description}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mt-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-xl opacity-90">{plan.duration}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="p-6">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={
                      () =>
                        plan.name === "Basic"
                          ? navigate("/biodatas") // ⬅️ redirect for Basic plan
                          : setSelectedPlan(plan) // ⬅️ open Stripe modal for paid plans
                    }
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                      plan.popular
                        ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:shadow-lg"
                        : "bg-pink-100 text-pink-600 hover:bg-pink-200"
                    }`}
                  >
                    {plan.name === "Basic" ? "Get Started" : "Upgrade Now"}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stripe Checkout Modal */}
        {selectedPlan && selectedPlan.amount > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />

            {/* Modal container */}
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                className="relative transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all w-full max-w-md"
              >
                {/* Close button */}
                <button
                  onClick={() => setSelectedPlan(null)}
                  className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close payment modal"
                >
                  <svg
                    className="h-6 w-6 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Modal content */}
                <div className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900">
                      Upgrade to {selectedPlan.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Complete your payment to unlock premium features
                    </p>
                  </div>

                  <Elements stripe={stripePromise}>
                    <CheckoutContactRequest
                      planName={selectedPlan.name}
                      amount={selectedPlan.amount}
                      onSuccess={() => setSelectedPlan(null)}
                    />
                  </Elements>
                </div>

                {/* Footer note */}
                <div className="bg-gray-50 px-6 py-4">
                  <p className="text-xs text-gray-500 text-center">
                    Secure payment processed by Stripe
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Comparison Note */}
        <div className="mt-12 text-center text-gray-600">
          <p>
            All plans include our{" "}
            <span className="text-pink-600 font-semibold">
              100% verified profiles
            </span>{" "}
            and{" "}
            <span className="text-pink-600 font-semibold">
              privacy protection
            </span>{" "}
            guarantee.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MembershipPlans;
