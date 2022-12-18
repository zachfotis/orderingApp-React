import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { useDeliveryContext } from '../../context/DeliveryContext';
import LoaderSmall from '../LoaderSmall';

function EditAddress({ setShowEditAddress }: { setShowEditAddress: (value: boolean) => void }) {
  const { userInfoState, userInfoDispatch } = useDeliveryContext();
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState<[number, number]>([
    Number(userInfoState.fullAddress.lat),
    Number(userInfoState.fullAddress.lng),
  ]);
  const [address, setAddress] = useState(userInfoState.fullAddress.address + ' ' + userInfoState.fullAddress.number);
  const [area, setArea] = useState(userInfoState.fullAddress.area);
  const [city, setCity] = useState(userInfoState.fullAddress.city);
  const [postalCode, setPostalCode] = useState(userInfoState.fullAddress.postalCode);

  useEffect(() => {
    const getFullAddress = async () => {
      const requestedAddress = `${address} ${area} ${city} ${postalCode}`;
      const encodedAddress = encodeURIComponent(requestedAddress);
      const response = await fetch(`http://localhost:3001/api/coordinates?address=${encodedAddress}`);
      const fullAddress = await response.json();
      if (!fullAddress) {
        return;
      }

      setPosition([Number(fullAddress.lat), Number(fullAddress.lng)]);
    };

    getFullAddress();
  }, [address, area, city, postalCode]);

  const handleSubmit = async (selectedAddress: string) => {
    setIsLoading(true);
    const encodedAddress = encodeURIComponent(selectedAddress);
    const response = await fetch(`http://localhost:3001/api/coordinates?address=${encodedAddress}`);
    const fullAddress = await response.json();

    if (!fullAddress) {
      setIsLoading(false);
      return;
    }

    userInfoDispatch({
      type: 'SET_ADDRESS',
      payload: fullAddress,
    });

    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0, y: '-100%' }}
      className="relative w-full min-h-screen flex flex-col justify-start items-center gap-5"
    >
      <div className="relative w-full" style={{ height: '30%' }}>
        <MapContainer center={position} zoom={17} scrollWheelZoom={true} style={{ width: '100%', height: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} />
        </MapContainer>
      </div>
      {isLoading ? (
        <LoaderSmall />
      ) : (
        <div className="w-full max-w-[500px] flex flex-col rounded-lg justify-center items-start gap-7 px-5">
          <div className="w-full flex flex-col justify-start items-center gap-1">
            <h1 className="w-full text-2xl font-bold text-slate-900 text-center">Βάλε την διεύθυνση σου</h1>
            <h1 className="w-full text-sm text-center text-greyLight">
              Επιβεβαίωσε ότι η διεύθυνσή σου έχει συμπληρωθεί σωστά
            </h1>
          </div>
          <FormControl variant="outlined" className="w-full">
            <InputLabel htmlFor="address-input">Διεύθυνση</InputLabel>
            <OutlinedInput
              id="address-input"
              type="text"
              label="Διεύθυνση"
              autoComplete="address-line1"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </FormControl>
          <FormControl variant="outlined" className="w-full">
            <InputLabel htmlFor="area-input">Περιοχή</InputLabel>
            <OutlinedInput
              id="area-input"
              type="text"
              label="Περιοχή"
              autoComplete="address-line2"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />
          </FormControl>
          <FormControl variant="outlined" className="w-full">
            <InputLabel htmlFor="city-input">Πόλη</InputLabel>
            <OutlinedInput
              id="city-input"
              type="text"
              label="Πόλη"
              autoComplete="address-level2"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </FormControl>
          <FormControl variant="outlined" className="w-full">
            <InputLabel htmlFor="postal-input">Ταχ. Κώδικας</InputLabel>
            <OutlinedInput
              id="postal-input"
              type="text"
              label="Ταχ. Κώδικας"
              autoComplete="postal-code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </FormControl>
          <div className="w-full flex flex-col justify-start items-center gap-3">
            <button
              className="bg-yellow text-black w-full py-3 rounded-lg font-[500] text-sm hover:bg-yellowHover disabled:bg-greyLight"
              onClick={() => {
                handleSubmit(`${address}, ${area}, ${city} ${postalCode}`);
                setShowEditAddress(false);
              }}
            >
              Έλεγχος Διεύθυνσης
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
export default EditAddress;
