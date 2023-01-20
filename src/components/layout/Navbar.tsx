import { useDeliveryContext } from '../../context/DeliveryContext';
import { HiSearch } from 'react-icons/hi';
import { FaUser } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

function Navbar() {
  const { userInfoState } = useDeliveryContext();
  const location = useLocation();

  return (
    <AnimatePresence>
      {location.pathname === '/' ? null : (
        <motion.nav
          initial={{ opacity: 0, y: '-100%', position: 'absolute' }}
          animate={{ opacity: 1, y: 0, position: 'sticky' }}
          transition={{ duration: 0.5, delay: 0.5 }}
          exit={{ opacity: 0, y: '-100%', position: 'absolute' }}
          className="bg-white w-full p-5 mb-2 shadow-lg sticky top-0 z-50 md:mb-5"
        >
          <div className="w-full max-w-[1280px] mx-auto flex justify-between items-center gap-10">
            <div className="max-w-[600px] md:mx-auto md:flex-1 md:order-2">
              <HiSearch className="text-2xl cursor-pointer md:hidden" />
              <div className="w-full hidden md:block">
                <FormControl variant="outlined" className="w-full" size="small">
                  <InputLabel htmlFor="store-input">Αναζήτηση Καταστήματος</InputLabel>
                  <OutlinedInput
                    id="store-input"
                    type="text"
                    label="Αναζήτηση Καταστήματος"
                    endAdornment={
                      <InputAdornment position="end">
                        <HiSearch className="text-2xl cursor-pointer" />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
            </div>
            <div className="flex justify-center items-center gap-2 md:order-1">
              <MdLocationOn className="text-3xl text-orange-600 hidden md:block" />
              <div className="flex flex-col justify-start items-start">
                <h1 className="text-sm text-greyLight text-center hidden md:block">Διεύθυνση Παράδοσης:</h1>
                <h1 className="md:text-sm">
                  {userInfoState?.fullAddress?.address + ' ' + userInfoState?.fullAddress?.number}
                </h1>
              </div>
            </div>
            <div className="flex justify-center items-center gap-3 md:order-3">
              <div className="hidden md:flex flex-col justify-start items-end">
                <h1 className="text-sm">Φώτης</h1>
                <h1 className="text-sm">Ζαχόπουλος</h1>
              </div>
              <FaUser className="text-2xl cursor-pointer" />
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
export default Navbar;
