import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { RiCloseFill } from 'react-icons/ri';
import Wallpaper from '../assets/images/wallpaper.jpg';
import AddressManager from '../components/address/AddressManager';
import LoginCard from '../components/LoginCard';
import styles from './Welcome.module.css';

function Welcome() {
  const [showAddressManager, setShowAddressManager] = useState(false);
  const [showDeclaration, setShowDeclaration] = useState(true);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen h-screen w-full flex flex-col justify-start items-center
      md:flex-row-reverse md:justify-between md:items-stretch
    "
    >
      <img src={Wallpaper} alt="wallpaper food" className="h-[100%] w-full object-cover md:w-[50%]" />
      {showDeclaration && (
        <div
          className={`${styles.declaration} w-full absolute bottom-0 left-0
        p-2 md:px-5 md:py-2 shadow-lg text-center z-10 text-sm  text-[300] italic`}
        >
          <h1 className="px-7">
            This e-food ordering app is a project developed for educational purposes as part of my studies in SAE Athens
            and is not intended for commercial use or to be mistaken as an actual e-commerce platform.
          </h1>
          <RiCloseFill
            className="absolute top-2 right-2 text-2xl cursor-pointer"
            onClick={() => setShowDeclaration(false)}
          />
        </div>
      )}
      <AnimatePresence>
        {!showAddressManager && <LoginCard setShowAddressManager={setShowAddressManager} />}
      </AnimatePresence>
      <AnimatePresence>
        {showAddressManager && <AddressManager setShowAddressManager={setShowAddressManager} />}
      </AnimatePresence>
    </motion.section>
  );
}
export default Welcome;
