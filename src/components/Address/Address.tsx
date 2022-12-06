import { useState } from 'react';
import { useDeliveryContext } from '../../context/DeliveryContext';
import { motion } from 'framer-motion';
import { MdArrowBackIos as BackArrow } from 'react-icons/md';
import ConfirmAddress from './ConfirmAddress';
import SearchAddress from './SearchAddress';

function NewAddress({ showAddress }: { showAddress: (value: boolean) => void }) {
  const [showSearch, setShowSearch] = useState(true);
  const [showConfirmAddress, setShowConfirmAddress] = useState(false);
  const { userInfoState } = useDeliveryContext();

  const isAddressSelected = userInfoState.address || (userInfoState.coords_lat && userInfoState.coords_lng);

  return (
    <motion.div
      initial={{ left: '-100%' }}
      animate={{ left: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ left: '-100%' }}
      className="bg-slate-50 py-7 px-5 w-full h-screen min-h-screen flex flex-col justify-start items-start gap-5 absolute top-0 left-0 md:w-[50%]"
    >
      <BackArrow className="text-3xl ml-2 mb-2 cursor-pointer" onClick={() => showAddress(false)} />
      <h1 className="text-2xl font-[500] w-full text-left md:text-4xl">Βάλε την διεύθυνση σου</h1>
      {showSearch && !isAddressSelected && (
        <SearchAddress showSearch={setShowSearch} showConfirmAddress={setShowConfirmAddress} />
      )}
      {(showConfirmAddress || isAddressSelected) && <ConfirmAddress />}
    </motion.div>
  );
}
export default NewAddress;
