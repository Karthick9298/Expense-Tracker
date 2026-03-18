import Navbar from '../components/landing-page/Navbar';
import HeroSection from '../components/landing-page/HeroSection';
import FeaturesSection from '../components/landing-page/FeaturesSection';
import HowItWorks from '../components/landing-page/HowItWorks';
import ContributeSection from '../components/landing-page/ContributeSection';
import Footer from '../components/landing-page/Footer';

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

export default LandingPage;
