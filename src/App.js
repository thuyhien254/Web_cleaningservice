import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../src/components/Layout";
import Nolayout from "../src/components/Nolayout";

import Scrolltop from "../src/components/Scrolltop";
import Homepage from "../src/Pages/Homepage/Homepage";

// NEW — dynamic service page
import ServicePage from "../src/Pages/Servicepage/Servicepage.jsx";

import Loginpage from "./Pages/Login/Loginpage";
import Registerpage from "../src/Pages/Registerpage/Register";
import Forgot from "../src/Pages/Forgotaccountpage/Forgot";

// GIỮ booking
import Bookingpage from "../src/Pages/Bookingpage/Booking";

import AdminPage from "../src/Pages/Adminpage/Dashboard.jsx";
import RequireAdmin from "./components/RequireAdmin.jsx";

function App() {
  return (
    <Router>
      <Scrolltop />

      <Routes>
        {/* Layout chuẩn có Navbar/Footer */}
        <Route element={<Layout />}>
          <Route path="/" element={<Homepage />} />

          {/* Dynamic service page */}
          <Route path="/services/:id" element={<ServicePage />} />

          {/* KEEP: booking page là trang riêng */}
          <Route path="/booking" element={<Bookingpage />} />
        </Route>

        {/* NoLayout: login/signup */}
        <Route element={<Nolayout />}>
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<Registerpage />} />
          <Route path="/forgot-password" element={<Forgot />} />
        </Route>

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminPage />
            </RequireAdmin>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
