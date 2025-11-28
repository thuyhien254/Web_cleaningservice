import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext"; 

import Layout from "../src/components/Layout";
import Nolayout from "../src/components/Nolayout";

import Scrolltop from "../src/components/Scrolltop";
import Homepage from "../src/Pages/Homepage/Homepage";

import ServicePage from "../src/Pages/Servicepage/Servicepage.jsx";

import Bookingpage from "../src/Pages/Bookingpage/Booking";
import BookingHistory from "../src/Pages/Bookingpage/BookingHistory.jsx";

import Loginpage from "./Pages/Login/Loginpage";
import Registerpage from "../src/Pages/Registerpage/Register";
import Forgot from "../src/Pages/Forgotaccountpage/Forgot";

import RequireAdmin from "./components/RequireAdmin.jsx";
import Dashboard from "./Pages/AdminBooking/Dashboard.jsx";
import AdminBooking from "../src/Pages/AdminBooking/AdminBooking.jsx";
import AdminLayout from "../src/components/Adminlayout.jsx";
import Employees from "./Pages/AdminBooking/Employees.jsx";
import AdminServiceCreate from "./Pages/AdminBooking/AdminServiceCreate.jsx";

import RequireLogin from "../src/components/RequireLogin.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Scrolltop />

        <Routes>

          {/* LAYOUT USER */}
          <Route element={<Layout />}>

            {/* HOMEPAGE —*/}
            <Route 
              path="/" 
              element={
                <RequireLogin>
                  <Homepage />
                </RequireLogin>
              } 
            />

            <Route path="/services/:id" element={<ServicePage />} />

            <Route 
              path="/booking" 
              element={
                <RequireLogin>
                  <Bookingpage />
                </RequireLogin>
              } 
            />

            <Route 
              path="/booking-history" 
              element={
                <RequireLogin>
                  <BookingHistory />
                </RequireLogin>
              } 
            />

          </Route>

          {/* AUTH PAGES */}
          <Route element={<Nolayout />}>
            <Route path="/login" element={<Loginpage />} />
            <Route path="/signup" element={<Registerpage />} />
            <Route path="/forgot-password" element={<Forgot />} />
          </Route>

          {/* ADMIN */}
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminLayout />
              </RequireAdmin>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="/admin/booking" element={<AdminBooking />} />
            <Route path="/admin/employees" element={<Employees />} />
            <Route path="/admin/service" element={<AdminServiceCreate />} />
          </Route>

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
