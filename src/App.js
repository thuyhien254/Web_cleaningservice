import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../src/components/Layout";
import Homepage from "../src/Pages/Homepage";
import HouseCleaningPage from "../src/Pages/HouseCleaning";
import HouseMovingPage from "../src/Pages/HouseMoving";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/house-cleaning" element={<HouseCleaning />} />
          <Route path="/house-moving" element={<HouseMoving />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
