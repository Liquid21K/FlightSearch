import {Card, CardFooter, Image, Button} from "@heroui/react";
import {Chip} from "@heroui/react";


const DealCard = ({deal}) => {
    return (
        <div className="flex justify-center">
  <article className="relative flex flex-col justify-between overflow-hidden rounded-2xl shadow-lg w-80 h-96 mx-auto">
    {/* Image */}
    <img
      src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a"
      alt="University of Southern California"
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 hover:scale-105"
    />

    {/* Dark overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>

    {/* Price chip */}
    <div className="absolute top-4 right-4 z-10">
      <Chip color="primary" className="text-white text-sm" variant="flat">
        {deal.price}
      </Chip>
    </div>

    {/* Content */}
    <div className="relative z-10 p-4 flex flex-col justify-end h-full">
      <div className="flex-1 flex items-center justify-center">
        <h3 className="text-xl font-bold text-white text-center">{deal.destinationCity}</h3>
      </div>
      <div className="mt-2 text-center text-gray-300 text-sm">
        <p>Departure: {deal.departureTime}</p>
        <p>Arrival: {deal.arrivalTime}</p>
      </div>
    </div>
  </article>
</div>

    )
}   

export default DealCard;    

