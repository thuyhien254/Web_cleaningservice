import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext"; 

import Layout from "../src/components/Layout";
import Nolayout from "../src/components/Nolayout";

import Scrolltop from "../src/components/Scrolltop";
import Homepage from "../src/Pages/Homepage/Homepage";
import ServicePage from "../src/Pages/Servicepage/Servicepage.jsx";
import Contact from "../src/Pages/Contact/Contact.jsx";

import Bookingpage from "../src/Pages/Bookingpage/Booking";
import BookingHistory from "../src/Pages/Bookingpage/BookingHistory.jsx";

import Loginpage from "./Pages/Login/Loginpage";
import Registerpage from "../src/Pages/Registerpage/Register";

import RequireAdmin from "./components/RequireAdmin.jsx";
import Dashboard from "./Pages/AdminBooking/Dashboard.jsx";
import AdminBooking from "../src/Pages/AdminBooking/AdminBooking.jsx";
import AdminLayout from "../src/components/Adminlayout.jsx";
import Employees from "./Pages/AdminBooking/Employees.jsx";
import Servicelist from "./Pages/AdminBooking/Servicelist.jsx";
import ServiceBuilder from './Pages/AdminService/ServiceBuilder';

import RequireLogin from "../src/components/RequireLogin.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Scrolltop />

        <Routes>

          {/* LAYOUT USER */}
          <Route element={<Layout />}>
  
            <Route path="/" element={<Homepage />} />
            <Route path="/services/:id" element={<ServicePage />} />
            <Route path="/contact" element={<Contact />} />

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
            <Route path="/admin/service" element={<Servicelist />} />
            <Route path="/admin/service/create" element={<ServiceBuilder />} />
          </Route>

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
