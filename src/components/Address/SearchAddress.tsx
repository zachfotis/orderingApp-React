import { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { BiSearchAlt2 } from 'react-icons/bi';
import { useDeliveryContext } from '../../context/DeliveryContext';
import { MdPlace } from 'react-icons/md';
import GpsInput from './GpsInput';
import { motion } from 'framer-motion';
import LoaderSmall from '../LoaderSmall';

function SearchAddress() {
  const [newAddress, setNewAddress] = useState('');
  const [proposedAddresses, setProposedAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userInfoDispatch } = useDeliveryContext();

  useEffect(() => {
    const getLocation = async () => {
      setIsLoading(true);
      const response = await fetch(`http://localhost:3001/api/places?address=${newAddress}`);
      const data = await response.json();
      setProposedAddresses(data);
      setIsLoading(false);
    };

    if (newAddress && newAddress.length > 3) {
      getLocation();
    } else if (newAddress.length === 0) {
      setProposedAddresses([]);
    }
  }, [newAddress]);

  const setAddress = async (selectedAddress: string) => {
    setIsLoading(true);
    setProposedAddresses([]);
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
      className="w-full flex flex-col justify-start items-start gap-5 mt-14 py-7 px-5"
    >
      <h1 className="text-2xl font-[500] w-full text-left md:text-4xl">Βάλε την διεύθυνση σου</h1>

      <FormControl variant="outlined" className="w-full">
        <InputLabel htmlFor="address-input">Διεύθυνση</InputLabel>
        <OutlinedInput
          id="address-input"
          type="text"
          label="Διεύθυνση"
          autoFocus={true} //eslint-disable-line
          autoComplete="street-address"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <BiSearchAlt2 className="text-2xl cursor-pointer" />
            </InputAdornment>
          }
        />
      </FormControl>
      <GpsInput />
      {isLoading ? (
        <LoaderSmall />
      ) : (
        proposedAddresses.length > 0 &&
        proposedAddresses.map((proposedAddress: string) => (
          <div
            key={proposedAddress}
            className="w-full flex justify-start items-center gap-3 px-1 cursor-pointer"
            onClick={() => setAddress(proposedAddress)}
            role="button"
            tabIndex={0}
            onKeyDown={() => setAddress(proposedAddress)}
          >
            <MdPlace className="text-3xl text-greyLight" />
            <div className="w-full flex flex-col justify-start items-start gap-1 border-b border-b-greyLight pb-2">
              <h1 className="text-sm">{proposedAddress?.split(',')[0]}</h1>
              <h2 className="text-greyLight text-xs">
                {proposedAddress?.split(',')[1]},{proposedAddress?.split(',')[2]}
              </h2>
            </div>
          </div>
        ))
      )}
    </motion.div>
  );
}
export default SearchAddress;
