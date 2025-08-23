import CircularText from './../assets/CircularText';
  



const LoadingCircle = () => {
    return ( <>
        <div className="flex justify-center items-center h-screen bg-blue-700 bg-opacity-50">
            <CircularText 
            text="FlightSearch*Best*Prices*"
            onHover="speedUp"
            spinDuration={20}
            className="bg-blue-500 text-gray align-center justify-center m-36 text-7xl  shadow-lg"
            />
        
        </div>
        </>);
        
}
 
export default LoadingCircle;