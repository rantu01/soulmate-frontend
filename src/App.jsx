import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Biodatas from "./pages/Biodatas";
import BiodataDetails from "./pages/BiodataDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/biodatas" element={<Biodatas />} />
        <Route path="/biodata/:id" element={<BiodataDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
