import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../src/components/Layout";
import ScrollToTop from "./components/Scrolltop";
import Homepage from "../src/Pages/Homepage/Homepage";
import HouseCleaning from "../src/Pages/HouseCleaningpage/HouseCleaning";
import HouseMoving from "../src/Pages/HouseMovingpage/HouseMoving";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/house-cleaning" element={<HouseCleaning />} />
          <Route path="/house-moving" element={<HouseMoving />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
