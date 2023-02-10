import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaUserSecret } from 'react-icons/fa';
import { FcHome, FcInfo } from 'react-icons/fc';
import { MdCloudUpload, MdReplay } from 'react-icons/md';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { toast } from 'react-toastify';
import ProfileIcon from '../assets/icons/profile.png';
import AddressManager from '../components/address/AddressManager';
import { useDeliveryContext } from '../context/DeliveryContext';
import { useFirebaseContext } from '../context/FirebaseContext';

function Profile() {
  const { isNormalAccount, user } = useFirebaseContext();
  const { userInfoState, userInfoDispatch, setIsLoading } = useDeliveryContext();
  const [currentAddress, setCurrentAddress] = useState(userInfoState.fullAddress);
  const [showAddressManager, setShowAddressManager] = useState(false);
  const [position, setPosition] = useState<[number, number]>([Number(currentAddress.lat), Number(currentAddress.lng)]);

  useEffect(() => {
    if (!showAddressManager) {
      if (!userInfoState.fullAddress.confirmed && currentAddress.confirmed) {
        userInfoDispatch({ type: 'SET_ADDRESS', payload: currentAddress });
        userInfoDispatch({ type: 'SET_ADDRESS_CONFIRMED', payload: true });
      }
    }

    return () => {
      if (!userInfoState.fullAddress.confirmed && currentAddress.confirmed) {
        userInfoDispatch({ type: 'SET_ADDRESS', payload: currentAddress });
        userInfoDispatch({ type: 'SET_ADDRESS_CONFIRMED', payload: true });
      }
    };
  }, [showAddressManager]);

  useEffect(() => {
    if (userInfoState.fullAddress.confirmed) {
      setCurrentAddress(userInfoState.fullAddress);
    }
  }, [userInfoState.fullAddress]);

  useEffect(() => {
    if (currentAddress.lat && currentAddress.lng) {
      setPosition([Number(currentAddress.lat), Number(currentAddress.lng)]);
    }
  }, [currentAddress]);

  const handleInfoSave = async () => {
    try {
      if (isNormalAccount) {
        setIsLoading(true);
        const db = getFirestore();
        const docRef = doc(db, 'users', user.uid);
        await updateDoc(docRef, {
          firstName: userInfoState.firstName,
          lastName: userInfoState.lastName,
          phone: userInfoState.phone,
          email: userInfoState.email,
        });
        toast.success('Τα στοιχεία σου αποθηκεύτηκαν');
      }
    } catch (error) {
      toast.error('Παρουσιάστηκε κάποιο σφάλμα');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className="w-full mx-auto p-5 min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)] flex flex-col justify-start items-center overflow-hidden"
    >
      {!isNormalAccount ? (
        <div className="flex-1 flex flex-col justify-center items-center gap-7 p-5">
          <div className="bg-gray-100 p-7 rounded-full">
            <FaUserSecret className="text-6xl text-gray-500" />
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <h1 className="text-2xl font-[600]">Δεν έχεις συνδεθεί</h1>
            <p className="text-center text-xs">Πρέπει να συνδεθείς για να δεις τις παραγγελίες σου.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col justify-start items-center my-5 gap-3">
            <img src={ProfileIcon} alt="order logo" className="w-[50px]" />
            <h1 className="text-xl md:text-2xl">Το προφίλ σου</h1>
          </div>
          {/* address */}
          <div className="w-full max-w-[1280px] p-3 md:p-5 bg-white rounded-lg shadow-sm flex flex-col justify-start items-stretch gap-2">
            <h1 className="text-base text-greyDark font-[500] flex justify-start items-center gap-2 mb-3 py-1 border-b border-b-1 border-b-slate-200">
              <FcHome className="text-xl" />
              Διεύθυνση Παράδοσης
            </h1>
            <div className="w-full h-[150px] md:h-[250px] z-0 rounded-lg shadow-sm overflow-hidden">
              <MapContainer
                center={position}
                zoomAnimation={true}
                zoom={13}
                scrollWheelZoom={true}
                style={{ width: '100%', height: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} />
              </MapContainer>
            </div>
            <div className="mt-2 flex justify-between items-center gap-5">
              <div>
                <p className="text-sm font-[500]">
                  {userInfoState?.fullAddress.address +
                    ' ' +
                    userInfoState?.fullAddress.number +
                    ', ' +
                    userInfoState?.fullAddress.postalCode}
                </p>
                <p className="text-sm font-[400]">{userInfoState?.fullAddress.city}</p>
              </div>
              <button
                className="flex justify-center items-center gap-2 px-4 py-2 rounded-lg text-sm md:text-base
            bg-yellow hover:bg-yellowHover focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-transparent"
                onClick={() => {
                  userInfoDispatch({ type: 'DELETE_ADDRESS' });
                  setShowAddressManager(true);
                }}
              >
                <MdReplay className="text-lg md:text-xl" />
                Αλλαγή
              </button>
            </div>
          </div>
          {/* Στοιχεία Πελάτη */}
          <div className="w-full max-w-[1280px] mt-5">
            <div className="w-full p-3 md:p-5 bg-white rounded-lg shadow-sm flex flex-col justify-start items-stretch gap-5">
              <h1 className="text-base text-greyDark font-[500] flex justify-start items-center gap-2 py-1 border-b border-b-1 border-b-slate-200">
                <FcInfo className="text-xl" />
                Πληροφορίες Πελάτη
              </h1>
              <div className="w-full px-1 text-sm text-greyDark grid grid-cols-[max-content_1fr] items-center gap-x-5 gap-y-4">
                <label htmlFor="firstName">Όνομα</label>
                <input
                  id="firstName"
                  type="text"
                  autoComplete="given-name"
                  className="
                      w-full sm:max-w-[350px] h-[30px] p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-transparent"
                  value={userInfoState?.firstName}
                  onChange={(e) => userInfoDispatch({ type: 'SET_FIRST_NAME', payload: e.target.value })}
                  required
                />
                <label htmlFor="lastName">Επώνυμο</label>
                <input
                  id="lastName"
                  type="text"
                  autoComplete="family-name"
                  className="
                    w-full sm:max-w-[350px] h-[30px] p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-transparent"
                  value={userInfoState?.lastName}
                  onChange={(e) => userInfoDispatch({ type: 'SET_LAST_NAME', payload: e.target.value })}
                  required
                />
                <label htmlFor="phone">Τηλέφωνο</label>
                <input
                  id="phone"
                  type="text"
                  autoComplete="tel"
                  className={`
                    w-full sm:max-w-[350px] h-[30px] p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-transparent
                    ${
                      userInfoState?.phone.length >= 10 &&
                      !userInfoState?.isPhoneValid &&
                      'border-red-500 focus:ring-red-500'
                    }`}
                  value={userInfoState?.phone}
                  onChange={(e) => userInfoDispatch({ type: 'SET_PHONE', payload: e.target.value })}
                  required
                />
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className={`
                    w-full sm:max-w-[350px] h-[30px] p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-transparent
                    ${
                      userInfoState?.email.length >= 1 &&
                      !userInfoState?.isEmailValid &&
                      'border-red-500 focus:ring-red-500'
                    }
                    `}
                  value={userInfoState?.email}
                  onChange={(e) => userInfoDispatch({ type: 'SET_EMAIL', payload: e.target.value })}
                  required
                />
              </div>
              <button
                className="w-full sm:max-w-[250px] mt-3 flex justify-center items-center gap-2 px-3 py-2 rounded-lg tet-sm md:text-base
              bg-yellow hover:bg-yellowHover focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-transparent
                disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleInfoSave}
                disabled={userInfoState?.isEmailValid && userInfoState?.isPhoneValid ? false : true}
              >
                <MdCloudUpload className="text-lg md:text-xl" />
                Αποθήκευση
              </button>
            </div>
          </div>
          {/* AddressManager */}
          <AnimatePresence>
            {showAddressManager && (
              <div className="fixed w-full md:max-w-[50%] h-full top-0 left-0 z-50 rounded-r-lg overflow-hidden">
                <AddressManager setShowAddressManager={setShowAddressManager} />
              </div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.section>
  );
}
export default Profile;
