import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../src/components/Layout";
import Nolayout from "../src/components/Nolayout";

import Scrolltop from "../src/components/Scrolltop";
import Homepage from "../src/Pages/Homepage/Homepage";
import HouseCleaningpage from "../src/Pages/HouseCleaningpage/HouseCleaning";
import HouseMovingpage from "../src/Pages/HouseMovingpage/HouseMoving";
import Bookingpage from "../src/Pages/Bookingpage/Booking";

import Loginpage from "./Pages/Login/Loginpage";
import Registerpage from "../src/Pages/Registerpage/Register";
import Forgot from "../src/Pages/Forgotaccountpage/Forgot";

import AdminPage from "../src/Pages/Adminpage/Dashboard.jsx";
import RequireAdmin from "./components/RequireAdmin.jsx";

function App() {
  return (
    <Router>
      {/* ScrollToTop phải NẰM TRONG Router */}
      <Scrolltop />

      <Routes>
        {/* Trang có Navbar/Footer */}
        <Route element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/house-cleaning" element={<HouseCleaningpage />} />
          <Route path="/house-moving" element={<HouseMovingpage />} />
          <Route path="/booking" element={<Bookingpage />} />
        </Route>

        {/* Trang không có layout */}
        <Route element={<Nolayout />}>
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<Registerpage />} />
          <Route path="/forgot-password" element={<Forgot />} />
        </Route>

        {/* ADMIN — BẮT BUỘC PHẢI LOGIN ADMIN */}
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
