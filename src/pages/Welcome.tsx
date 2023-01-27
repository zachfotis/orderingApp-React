import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { ImQuotesLeft, ImQuotesRight } from 'react-icons/im';
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
          className={`${styles.declaration} w-full md:w-[35%] absolute md:top-1/2 md:right-[25%] md:transform md:-translate-y-1/2 md:translate-x-1/2
        p-2 md:p-10 md:rounded-lg shadow-lg text-center z-10 text-sm md:text-lg text-[300] italic`}
        >
          <div className="w-full text-greyDark">
            <ImQuotesLeft className="text-xl md:text-4xl" />
          </div>
          <h1 className="px-7 md:mt-5">
            This e-food ordering app is a project developed for educational purposes as part of my studies in SAE Athens
            and is not intended for commercial use or to be mistaken as an actual e-commerce platform.
          </h1>
          <div className="w-full">
            <ImQuotesRight className="text-xl md:text-4xl ml-auto text-greyDark" />
          </div>
          <RiCloseFill
            className="absolute top-2 right-2 text-2xl md:text-4xl cursor-pointer"
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
