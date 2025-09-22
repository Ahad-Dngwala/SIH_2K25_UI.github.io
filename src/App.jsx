import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';

// Import all pages
import ProjectsPage from './pages/ProjectsPage';
import MarketplacePage from './pages/MarketplacePage';
import DashboardPage from './pages/DashboardPage';
import GeneralDashboardPage from './pages/GeneralDashboardPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

// Import components
import Navbar from './components/Navbar/Navbar';
import Navbar1 from './components/Navbar/Navbar-1';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import LoadingPage from './components/LoadingPage/LoadingPage'; // Import LoadingPage
import Hero from './components/Hero/Hero';
import About from './components/AboutUs/AboutUs';
import Impact from './components/Impact/Impact';
import Projects from './components/Projects/Projects';
import Transaction from './components/Transaction/Transaction';
import MapSection from './components/Map/Map';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import ProjectDetails from './components/MobileApp/ProjectDetails';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Hero Section */}
      <Hero />

      {/* About Us Section */}
      <About />

      {/* Impact Section */}
      <Impact />

      {/* Projects Section */}
      <Projects />

      {/* Transaction Section */}
      <Transaction />

      {/* Map Section */}
      <MapSection />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />
    </div>
  );
};



// HomePage with Loading - Only for the homepage
const HomePageWithLoading = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 3 seconds loading for homepage

    return () => clearTimeout(timer);
  }, []);

  return isLoading ? <LoadingPage /> : <HomePage />;
};

// PageWrapper for other pages (not homepage)
const PageWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // Only show loading for page navigations
    if (navigationType === 'PUSH' || navigationType === 'POP' || navigationType === 'REPLACE') {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500); // Shorter duration for page transitions

      return () => clearTimeout(timer);
    }
  }, [location, navigationType]);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}>
        {children}
      </div>
    </>
  );
};

const AppContent = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  const renderPage = (Component) => (
    <>
      <Navbar1 /> {/* Navbar1 for all other pages */}
      <PageWrapper>
        <Component />
      </PageWrapper>
    </>
  );

  return (
    <div className="min-h-screen">
      <Routes location={location} key={location.pathname}>
        {/* HomePage with LoadingPage */}
        <Route path="/" element={<HomePageWithLoading />} />
        
        {/* Other pages with LoadingSpinner and Navbar1 */}
        <Route path="/projects" element={renderPage(ProjectsPage)} />
        <Route path="/marketplace" element={renderPage(MarketplacePage)} />
        <Route path="/dashboard" element={renderPage(DashboardPage)} />
        <Route path="/dashboards" element={renderPage(GeneralDashboardPage)} />
        <Route path="/login" element={renderPage(LoginPage)} />
        <Route path="/signup" element={renderPage(SignupPage)} />
        <Route path="/mobile/project-details" element={<ProjectDetails />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;