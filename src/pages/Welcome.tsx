import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import LoginCard from '../components/LoginCard';
import Wallpaper from '../assets/images/wallpaper.jpg';
import AddressManager from '../components/address/AddressManager';

function Welcome() {
  const [showAddressManager, setShowAddressManager] = useState(false);

  return (
    <section
      className="relative min-h-screen h-screen w-full flex flex-col justify-start items-center
      md:flex-row-reverse md:justify-between md:items-stretch
    "
    >
      <img src={Wallpaper} alt="wallpaper food" className="h-[100%] w-full object-cover md:w-[50%]" />

      <AnimatePresence>
        {!showAddressManager && <LoginCard setShowAddressManager={setShowAddressManager} />}
      </AnimatePresence>
      <AnimatePresence>
        {showAddressManager && <AddressManager setShowAddressManager={setShowAddressManager} />}
      </AnimatePresence>
    </section>
  );
}
export default Welcome;
