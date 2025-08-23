'use client';

import { useRef } from 'react';
import CarouselData from './CarouselData';
import SecounCards from './SecounCards';

const CountryCarousel = ({openInformation}) => {
  const carouselRef = useRef(null);
  const c = CarouselData();


  return (
    <div className="relative w-full px-4 mt-20">
  {/* Centered Container with Max Width */}
  <div className="mx-auto max-w-7xl">
    {/* Horizontal Scrollable Cards */}
    <div
      ref={carouselRef}
      className="flex overflow-x-auto whitespace-nowrap gap-4 py-4 scroll-smooth no-scrollbar"
    >
      {c.map((item, idx) => (
        <div key={idx} className="inline-block">
          <SecounCards currentItem={item} openInformation={openInformation} />
        </div>
      ))}
    </div>
  </div>
</div>

  );
};

export default CountryCarousel;
