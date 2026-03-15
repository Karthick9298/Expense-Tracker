import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/landing-page/Navbar';
import HeroSection from './components/landing-page/HeroSection';
import FeaturesSection from './components/landing-page/FeaturesSection';
import HowItWorks from './components/landing-page/HowItWorks';
import ContributeSection from './components/landing-page/ContributeSection';
import Footer from './components/landing-page/Footer';
import RegisterPage from './components/auth/RegisterPage';
import LoginPage from './components/auth/LoginPage';

const LandingPage = () => (
  <div className="min-h-screen w-full overflow-x-hidden">
    <Navbar />
    <main>
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <ContributeSection />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Dashboard route placeholder */}
        <Route
          path="/dashboard"
          element={
            <div className="min-h-screen flex items-center justify-center text-2xl font-bold text-gray-700">
              Dashboard — Coming Soon
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
