'use client';
import { useState, useEffect } from 'react';
import Navbar from '../Bars/Navbar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Clouds from '../../assets/Clouds';
import SearchFlightBox from './SearchFlightBox';
import SplitText from '../../assets/SplitText';
import RotatingText from '../../assets/RoatatingText';
import SecoundScreen from './SecoundScreen';
import LoadingCircle from '../LoadingCircle';
import DarkClouds from '../../assets/FooterCloud';

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-700 relative">
      <div className="container mx-auto px-4 py-10">
        <div className="text-center text-9xl text-white font-extrabold flex items-center justify-center gap-4 mt-10 py-5">
          <SplitText
            text="FlightSearch"
            className="text-9xl font-semibold text-center p-5"
            delay={20}
            animationFrom={{ opacity: 0, transform: 'translate3d(0,80px,0)' }}
            animationTo={{ opacity: 1, transform: 'translate3d(0,-8px,0)' }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="0px"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
        <div className="flex flex-nowrap items-center text-3xl sm:text-4xl md:text-6xl font-bold font-heading text-white mb-6 tracking-wide justify-center gap-3 sm:gap-5">
          <span className="flex-shrink-0">
            <RotatingText
              texts={['Order', 'Search', 'Enjoy', 'Create!']}
              mainClassName="px-2 sm:px-2 md:px-3 bg-blue-400 text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
              staggerFrom={'first'}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-120%' }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: 'spring', damping: 30, stiffness: 700 }}
              rotationInterval={3700}
            />
          </span>
          <span className="flex-shrink-0 pt-0.5 sm:pt-1 md:pt-2">Your Perfect Flight!</span>
        </div>

          <p className="text-xl font-sans text-white mb-7">
            Discover the best deals on flights to your dream destinations
          </p>
        </div>
        <SearchFlightBox />
      </div>

      <Clouds />
      <SecoundScreen />
    </div>
  );
};

export default HomeScreen;
