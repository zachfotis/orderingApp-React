import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { FaFacebookF } from 'react-icons/fa';
import { FcGoogle, FcHome } from 'react-icons/fc';
import { MdEmail } from 'react-icons/md';
import { RiDeleteBack2Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useDeliveryContext } from '../context/DeliveryContext';
import { useFirebaseContext } from '../context/FirebaseContext';
import useLocalStorage from '../hooks/useLocalStorage';

function LoginCard({ setShowAddressManager }: { setShowAddressManager: (value: boolean) => void }) {
  const { user, isNormalAccount, connectWithGoogle, connectWithFacebook } = useFirebaseContext();
  const { userInfoState, userInfoDispatch } = useDeliveryContext();
  const { setValue } = useLocalStorage('address', '');

  const navigate = useNavigate();

  useEffect(() => {
    if (isNormalAccount && userInfoState.fullAddress.confirmed) {
      // navigate and replace the history so that the user can't go back to the login page
      navigate('/home', { replace: true });
    }
  }, [isNormalAccount, userInfoState.fullAddress.confirmed]);

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
          <div className="w-full flex flex-col justify-center items-center gap-2">
            <FcHome className="text-4xl" />
            <div className="flex justify-center items-center gap-3">
              <p className="text-base font-[400]">
                {userInfoState.fullAddress.address + ' ' + (userInfoState.fullAddress.number || '')},{' '}
                {userInfoState.fullAddress.area !== userInfoState.fullAddress.city
                  ? userInfoState.fullAddress.area
                  : ''}{' '}
                {userInfoState.fullAddress.postalCode}, {userInfoState.fullAddress.city}{' '}
              </p>
              <RiDeleteBack2Line
                className="text-lg text-red-500 cursor-pointer"
                onClick={() => {
                  userInfoDispatch({ type: 'DELETE_ADDRESS' });
                  setValue(
                    JSON.stringify({
                      address: '',
                      number: '',
                      area: '',
                      city: '',
                      postalCode: '',
                      lat: 0,
                      lng: 0,
                      confirmed: false,
                    }),
                  );
                  setShowAddressManager(true);
                }}
              />
            </div>
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

          <button
            className="bg-blue text-white w-full p-3 rounded-lg font-[500] text-sm flex justify-start items-center"
            onClick={() => {
              connectWithFacebook();
            }}
          >
            <FaFacebookF className="text-2xl" />
            <p className="w-full">Σύνδεση με Facebook</p>
          </button>

          <button
            className="bg-white text-black w-full p-3 rounded-lg font-[500] text-sm flex justify-start items-center border border-greyLight"
            onClick={() => {
              connectWithGoogle();
            }}
          >
            <FcGoogle className="text-2xl" />
            <p className="w-full">Σύνδεση με Google</p>
          </button>

          <button
            className="bg-white text-black w-full p-3 rounded-lg font-[500] text-sm flex justify-start items-center border border-greyLight cursor-not-allowed"
            disabled
          >
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
