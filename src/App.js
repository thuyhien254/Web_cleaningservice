import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../src/components/Layout";
import Nolayout from "../src/components/Nolayout";

import Scrolltop from "../src/components/Scrolltop";
import Homepage from "../src/Pages/Homepage/Homepage";

import ServicePage from "../src/Pages/Servicepage/Servicepage.jsx";

import Bookingpage from "../src/Pages/Bookingpage/Booking";

import Loginpage from "./Pages/Login/Loginpage";
import Registerpage from "../src/Pages/Registerpage/Register";
import Forgot from "../src/Pages/Forgotaccountpage/Forgot";

import RequireAdmin from "./components/RequireAdmin.jsx";
import AdminBooking from "../src/Pages/AdminBooking/AdminBooking.jsx";
import AdminLayout from "../src/components/Adminlayout.jsx";

import RequireLogin from "../src/components/RequireLogin.jsx";

function App() {
  return (
    <Router>
      <Scrolltop />

      <Routes>

        <Route element={<Layout />}>
          <Route path="/" element={<Homepage />} />

          <Route path="/services/:id" element={<ServicePage />} />

          <Route 
            path="/booking" 
            element={
              <RequireLogin>
                <Bookingpage />
              </RequireLogin>
            } 
          />
        </Route>

        <Route element={<Nolayout />}>
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<Registerpage />} />
          <Route path="/forgot-password" element={<Forgot />} />
        </Route>

         <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          }
        >
          <Route index element={<AdminBooking />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
