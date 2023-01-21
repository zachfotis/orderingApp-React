import { motion } from 'framer-motion';

import { BsFillBasket2Fill } from 'react-icons/bs';
import { MdOutlineSettingsBackupRestore } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function EmptyBasket() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-7 p-5">
      <div className="bg-gray-100 p-7 rounded-full">
        <BsFillBasket2Fill className="text-6xl text-gray-500" />
      </div>
      <div className="flex flex-col justify-center items-center gap-3">
        <h1 className="text-2xl font-[600]">Άδειο Καλάθι</h1>
        <p className="text-center text-xs">Προσθέστε προϊόντα στο καλάθι για να ολοκληρώσετε την παραγγελία σας.</p>
      </div>
      <motion.button
        className="bg-yellow text-black py-3 px-5 rounded-lg font-[500] text-base hover:bg-yellowHover disabled:bg-greyLight flex justify-center items-center"
        initial={{ opacity: 0, y: '100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '100%' }}
        transition={{ duration: 0.3 }}
        onClick={() => navigate('/home')}
      >
        <MdOutlineSettingsBackupRestore className="text-xl mr-2" />
        <p>Πίσω στην αρχική</p>
      </motion.button>
    </div>
  );
}
export default EmptyBasket;
