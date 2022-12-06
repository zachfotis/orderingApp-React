import { useState } from 'react';
import { MdOutlineGpsFixed as GpsIcon, MdArrowForwardIos as ArrowIcon } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useDeliveryContext } from '../../context/DeliveryContext';

function GpsInput() {
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });
  const { setIsLoading } = useDeliveryContext();

  const getLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Η τοποθεσία σου δεν μπορεί να προσδιοριστεί');
    } else {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsLoading(false);
          setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
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
        {coords.lat !== 0 && coords.lng !== 0 && (
          <p className="text-xs text-gray-500">
            {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
          </p>
        )}
      </div>
    </div>
  );
}
export default GpsInput;
