import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FaSpinner } from "react-icons/fa";

const Root = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  if (isLoading) {
    // Show loader full screen before rendering anything else
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-200">
        <FaSpinner className="text-pink-600 text-5xl animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pt-22">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
