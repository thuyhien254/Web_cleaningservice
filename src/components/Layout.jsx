import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../components/Layout.css"; 
import { Outlet } from "react-router-dom";


const Layout = ({ children }) => {
  return (
    <div className="layout-wrapper">
      <Navbar />

      <main className="layout-content">
        {children}
         <Outlet />  
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
