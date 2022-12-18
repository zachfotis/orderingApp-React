import { useFirebaseContext } from '../context/FirebaseContext';
import { FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { MdEmail, MdDelete } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useDeliveryContext } from '../context/DeliveryContext';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

function LoginCard({ setShowAddressManager }: { setShowAddressManager: (value: boolean) => void }) {
  const { user } = useFirebaseContext();
  const { userInfoState, userInfoDispatch } = useDeliveryContext();
  const { setValue } = useLocalStorage('address', '');

  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ top: '100%' }}
      animate={{ top: '50%' }}
      transition={{ duration: 0.5 }}
      exit={{ top: '100%' }}
      className="bg-slate-50 p-5 w-[90%] rounded-xl flex justify-center items-center
      absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2
      md:static md:transform-none md:top-0 md:left-0 md:w-full"
    >
      <div className="flex flex-col justify-start items-center gap-5 md:justify-center md:p-10 md:max-w-[800px]">
        <h1 className="text-2xl font-[500] w-full text-center md:text-4xl">
          Παράγγειλε <br className="md:hidden" /> Delivery <br /> online σε 1&apos;
        </h1>
        {userInfoState.fullAddress.confirmed && (
          <div className="w-full flex justify-center items-center gap-2">
            <p className="text-sm text-greyLight text-center">
              {userInfoState.fullAddress.address + ' ' + userInfoState.fullAddress.number},{' '}
              {userInfoState.fullAddress.area !== userInfoState.fullAddress.city ? userInfoState.fullAddress.area : ''}{' '}
              {userInfoState.fullAddress.postalCode}, {userInfoState.fullAddress.city}{' '}
            </p>
            <MdDelete
              className="text-xl text-red-600 cursor-pointer"
              onClick={() => {
                userInfoDispatch({ type: 'DELETE_ADDRESS' });
                setValue('');
                setShowAddressManager(true);
              }}
            />
          </div>
        )}
        <button
          className="bg-yellow text-black w-full py-3 rounded-lg font-[500] text-sm hover:bg-yellowHover disabled:bg-greyLight"
          disabled={!user}
          onClick={() => {
            if (userInfoState.fullAddress.confirmed) {
              navigate('/home');
            } else {
              setShowAddressManager(true);
            }
          }}
        >
          Παράγγειλε τώρα
        </button>

        <div className="w-full flex flex-col justify-start items-center gap-4">
          <p className="w-full text-sm text-left text-greyLight">Σύνδεση ή δημιουργία λογαριασμού</p>

          <button className="bg-blue text-white w-full p-3 rounded-lg font-[500] text-sm flex justify-start items-center">
            <FaFacebookF className="text-2xl" />
            <p className="w-full">Σύνδεση με Facebook</p>
          </button>

          <button className="bg-white text-black w-full p-3 rounded-lg font-[500] text-sm flex justify-start items-center border border-greyLight">
            <FcGoogle className="text-2xl" />
            <p className="w-full">Σύνδεση με Google</p>
          </button>

          <button className="bg-white text-black w-full p-3 rounded-lg font-[500] text-sm flex justify-start items-center border border-greyLight">
            <MdEmail className="text-2xl" />
            <p className="w-full">Σύνδεση/Εγγραφή με Email</p>
          </button>
        </div>

        <p className="w-full text-sm text-center text-greyDark">
          Με την εγγραφή ή σύνδεση συμφωνείς με τους <u className="cursor-pointer">Όροι Χρήσης</u> και{' '}
          <u className="cursor-pointer">Πολιτική Απορρήτου</u>
        </p>
      </div>
    </motion.div>
  );
}
export default LoginCard;
