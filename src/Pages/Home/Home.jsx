import React from 'react';
import HeroSection from '../../components/HomeComponents/HeroSection';
import HowItWorks from '../../components/HomeComponents/HowItWorks';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <HeroSection />
      <HowItWorks />
      {/* Other sections */}
    </div>
  );
};

export default Home;
