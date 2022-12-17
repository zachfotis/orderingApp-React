import { MdArrowBackIos as BackArrow } from 'react-icons/md';
import { motion } from 'framer-motion';

interface AddressLayoutProps {
  children: React.ReactNode;
  setShowAddressManager: (value: boolean) => void;
}

function AddressLayout({ children, setShowAddressManager }: AddressLayoutProps) {
  return (
    <motion.div
      initial={{ left: '-100%' }}
      animate={{ left: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ left: '-100%' }}
      className="bg-slate-50 w-full h-screen min-h-screen flex flex-col justify-start items-start gap-5 absolute top-0 left-0 md:w-[50%] overflow-hidden"
    >
      <div
        className="bg-slate-50 rounded-full p-2 absolute top-[25px] left-[15px] z-10 flex justify-center items-center cursor-pointer"
        onClick={() => {
          setShowAddressManager(false);
        }}
        onKeyDown={() => {
          setShowAddressManager(false);
        }}
        role="button"
        tabIndex={0}
      >
        <BackArrow className="text-3xl" />
      </div>
      {children}
    </motion.div>
  );
}

export default AddressLayout;
