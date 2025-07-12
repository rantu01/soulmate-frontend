import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FaSpinner } from "react-icons/fa";

const Root = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Loader */}
      {isLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
          <FaSpinner className="text-pink-600 text-5xl animate-spin" />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-grow pt-22">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Root;
