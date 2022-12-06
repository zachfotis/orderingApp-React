import { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { BiSearchAlt2 } from 'react-icons/bi';
import { MdPlace } from 'react-icons/md';
import { useDeliveryContext } from '../../context/DeliveryContext';
import GpsInput from './GpsInput';

function AddressInput() {
  const [newAddress, setNewAddress] = useState('');
  const [proposedAddresses, setProposedAddresses] = useState([]);
  const { userInfoDispatch } = useDeliveryContext();

  useEffect(() => {
    const getLocation = async () => {
      const response = await fetch(`http://localhost:3001/api/places?address=${newAddress}`);
      const data = await response.json();
      setProposedAddresses(data);
    };

    if (newAddress && newAddress.length > 3) {
      getLocation();
    } else if (newAddress.length === 0) {
      setProposedAddresses([]);
    }
  }, [newAddress]);

  const setAddress = (selectedAddress: string) => {
    userInfoDispatch({
      type: 'SET_ADDRESS',
      payload: selectedAddress,
    });
  };

  return (
    <div className="w-full  flex flex-col justify-start items-start gap-5">
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
      {proposedAddresses.length > 0 &&
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
        ))}
    </div>
  );
}
export default AddressInput;
