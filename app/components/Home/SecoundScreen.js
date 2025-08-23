import  SecounCards  from './SecounCards';
import CountryCarousel from './CountryCarousel';
import DarkClouds from '../../assets/FooterCloud';
import { useState } from 'react';
import InformationCard from "./InformationCard"
import HotDeals from "./HotDeals"

const SecoundScreen = () => {
    const [show , setshow] = useState(null)
    const openInformation = (state) => {
        setshow(state)
        console.log(state)
    }
    return ( <>
    <div className="w-full px-4 py-16 bg-white items-center justify-center">
        <div className="text-center mt-30">
            <h1 className="text-6xl font-bold">Your Dream destination waiting for you!</h1>
        </div>
        <CountryCarousel openInformation={openInformation}/>
        
    
    {show != null && (
        <> 
        <InformationCard show={show}/>
         </>
    ) }
    </div> 
    <div className='w-full min-h-screen px-16 py-16 bg-slate-100 items-center justify-center'>
        <HotDeals/>
    </div>
   <div className='relative bg-white items-center justify-center"'>
   <DarkClouds/>
   </div>
    </> );
}
 
export default SecoundScreen;