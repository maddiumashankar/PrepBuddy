import "./App.css";
import Header from './components/custom/Header';
import Footer from './components/custom/Footer';
import LandingPage from './components/custom/LandingPage';
import HomePage from './components/custom/HomePage';
import { Routes, Route } from "react-router-dom";
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
