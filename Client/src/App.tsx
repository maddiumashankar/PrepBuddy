import "./App.css";
import Header from "../src/components/custom/Header";
import { Routes, Route } from "react-router-dom";
import Footer from "../src/components/custom/Footer";
import LandingPage from "../src/components/custom/LandingPage";
import HomePage from "../src/components/custom/HomePage";
function App() {
  return (
    <div className="w-full min-h-[100vh] h-auto bg-gradient-to-r from-gray-900 to-gray-800 flex flex-col justify-between items-center text-white">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
      <Routes>
        <Route path="/homepage" element={<HomePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
