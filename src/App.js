import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../src/components/Layout";
import Nolayout from "../src/components/Nolayout";

import Scrolltop from "../src/components/Scrolltop";
import Homepage from "../src/Pages/Homepage/Homepage";
import HouseCleaningpage from "../src/Pages/HouseCleaningpage/HouseCleaning";
import HouseMovingpage from "../src/Pages/HouseMovingpage/HouseMoving";

import Loginpage from "./Pages/Login/Loginpage";
import Registerpage from "../src/Pages/Registerpage";


function App() {
  return (
   <Router>
          <Scrolltop />
      <Routes>
        
        {/* Trang dùng Navbar + Footer */}
        <Route element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/house-cleaning" element={<HouseCleaningpage />} />
          <Route path="/house-moving" element={<HouseMovingpage />} />
        </Route>

        {/* Trang KHÔNG có Navbar/Footer */}
        <Route element={<Nolayout />}>
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<Registerpage />} />
        </Route>

      </Routes>
    </Router>
  );
}
export default App;
