import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import About from "../pages/About";
import Root from "../components/Root";
import Home from "../pages/Home";
import ErrorPage from "../components/ErrorPage";
import Contact from "../pages/Contact";
import Biodatas from "../pages/Biodatas";
import PrivateRoute from "./PrivateRoute";
import BiodataDetails from "../pages/BiodataDetails";
import MainLayout from "../Layout/MainLayout";
import Register from "../pages/Register";
import CreateEditBiodata from "../components/CreateEditBiodata";
import DashboardLayout from "../Layout/DashboardLayout";
import ViewBiodata from "../pages/ViewBiodata";
import MyContactRequests from "../components/MyContactRequests";
import SuccessStoriesAdmin from "../components/SuccessStoriesAdmin";
import MyFavourites from "../components/MyFavourites";
import GotMarried from "../components/GotMarried";
import CheckoutContactRequest from "../pages/CheckoutContactRequest";
import AdminDashboard from "../Layout/AdminDashboard";
import DashboardHome from "../components/DashboardHome";
import ManageUsers from "../components/ManageUsers";
import ApprovedPremium from "../components/ApprovedPremium";
import ApprovedContactRequest from "../components/ApprovedContactRequest";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "biodatas",
        element: <Biodatas />,
      },
      {
        path: "biodata/:biodataId",
        element: (
          <PrivateRoute>
            <BiodataDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "checkout/:biodataId",
        element: (
          <PrivateRoute>
            <CheckoutContactRequest></CheckoutContactRequest>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "edit-biodata",
        element: (
          <PrivateRoute>
            <CreateEditBiodata />
          </PrivateRoute>
        ),
      },
      {
        path: "view-biodata",
        element: <ViewBiodata />,
      },
      {
        path: "my-contact-request",
        element: <MyContactRequests />,
      },
      {
        path: "my-favourites",
        element: <MyFavourites />,
      },
      {
        path: "got-married",
        element: <GotMarried></GotMarried>,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminDashboard />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "success-story",
        element: <SuccessStoriesAdmin></SuccessStoriesAdmin>,
      },
      {
        path: "approve-premium",
        element: <ApprovedPremium />,
      },
      {
        path: "approve-contact",
        element: <ApprovedContactRequest />,
      },
      //       {
      //         path: "success-stories",
      //         element: <SuccessStories />,
      //       },
    ],
  },
]);
