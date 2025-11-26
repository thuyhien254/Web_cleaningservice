import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../components/Layout.css";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="layout-wrapper">
      <Navbar />

      <main className="layout-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
