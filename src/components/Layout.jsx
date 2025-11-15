import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../components/Layout.css"; 

const Layout = ({ children }) => {
  return (
    <div className="layout-wrapper">
      <Navbar />

      <main className="layout-content">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
