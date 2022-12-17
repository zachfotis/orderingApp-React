import { MdOutlineGpsFixed as GpsIcon, MdArrowForwardIos as ArrowIcon } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useDeliveryContext } from '../../context/DeliveryContext';

function GpsInput() {
  const { setIsLoading, userInfoDispatch } = useDeliveryContext();

  const getLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Η τοποθεσία σου δεν μπορεί να προσδιοριστεί');
    } else {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = String(position.coords.latitude);
          const lng = String(position.coords.longitude);
          const coords = { lat, lng };
          const encodedCoords = new URLSearchParams(coords).toString();
          const response = await fetch(`http://localhost:3001/api/address?${encodedCoords}`);
          const address = await response.json();

          if (address) {
            userInfoDispatch({
              type: 'SET_ADDRESS',
              payload: address,
            });
          }

          userInfoDispatch({
            type: 'SET_COORDS_LAT',
            payload: Number(position.coords.latitude),
          });
          userInfoDispatch({
            type: 'SET_COORDS_LNG',
            payload: Number(position.coords.longitude),
          });
          setIsLoading(false);
        },
        () => {
          setIsLoading(false);
          toast.error('Δεν μπορέσαμε να βρούμε την τοποθεσία σου');
        },
      );
    }
  };

  return (
    <div
      className="flex justify-center items-center gap-3 px-2 text-green"
      onClick={getLocation}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && getLocation()}
    >
      <GpsIcon className="text-xl" />
      <div className="flex justify-center items-center gap-2">
        <p>Εντοπισμός τοποθεσίας</p>
        <ArrowIcon />
      </div>
    </div>
  );
}
export default GpsInput;
