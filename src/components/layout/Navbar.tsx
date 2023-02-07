import { FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { getAuth, signOut } from 'firebase/auth';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { HiSearch } from 'react-icons/hi';
import { IoMdCloseCircle } from 'react-icons/io';
import { MdLocationOn } from 'react-icons/md';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDeliveryContext } from '../../context/DeliveryContext';
import { useFirebaseContext } from '../../context/FirebaseContext';
import { Store } from '../../types';
import { baseURL } from '../../utilities/server';

import { SlHandbag, SlHome, SlLogin, SlLogout, SlUser } from 'react-icons/sl';

function Navbar() {
  const { userInfoState } = useDeliveryContext();
  const { isNormalAccount } = useFirebaseContext();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [storesResults, setStoresResults] = useState<Store[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth <= 768) {
        setIsTablet(true);
      } else {
        setIsTablet(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const getStores = async () => {
      const res = await fetch(baseURL + '/api/search?search=' + query);
      const data = await res.json();
      if (data.stores && data?.stores.length > 0) {
        setStoresResults(data.stores);
      } else if (data.stores && data?.stores.length === 0) {
        setStoresResults([]);
      }
    };

    if (query.length > 0) {
      getStores();
    } else {
      setStoresResults([]);
    }
  }, [query]);

  // if click anywhere else on the page, close the search results
  useEffect(() => {
    const closeSearchResults = (e: any) => {
      if (e.target.id !== 'search-bar') {
        setStoresResults([]);
      }
    };

    window.addEventListener('click', closeSearchResults);

    return () => window.removeEventListener('click', closeSearchResults);
  }, []);

  const handleSignOut = async () => {
    if (isNormalAccount) {
      try {
        const auth = getAuth();
        await signOut(auth);
        setIsUserMenuOpen(false);
        navigate('/');
        // reload page
        window.location.reload();
      } catch (error) {
        toast.error('Παρουσιάστηκε κάποιο πρόβλημα. Παρακαλώ προσπαθήστε ξανά.');
      }
    }
  };

  return (
    <AnimatePresence>
      {location.pathname === '/' ? null : (
        <motion.nav
          initial={{ opacity: 0, y: '-100%', position: 'absolute' }}
          animate={{ opacity: 1, y: 0, position: 'sticky' }}
          transition={{ duration: 0.5, delay: 0.5 }}
          exit={{ opacity: 0, y: '-100%', position: 'absolute' }}
          className={`bg-white w-full ${isTablet && isSearchOpen ? 'p-[15px]' : 'p-5'} shadow-lg sticky top-0 z-50`}
        >
          <div className="w-full max-w-[1280px] mx-auto flex justify-between items-center gap-10">
            <div
              id="search-bar"
              className={`relative ${
                isTablet && isSearchOpen && 'w-full'
              } max-w-[600px] md:mx-auto md:flex-1 md:order-2 flex justify-start items-center gap-5`}
            >
              <HiSearch className="text-3xl cursor-pointer md:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)} />
              {(!isTablet || (isTablet && isSearchOpen)) && (
                <div className="w-full">
                  <FormControl variant="outlined" className="w-full" size="small">
                    <InputLabel htmlFor="store-input">Αναζήτηση Καταστήματος</InputLabel>
                    <OutlinedInput
                      id="store-input"
                      type="text"
                      label="Αναζήτηση Καταστήματος"
                      endAdornment={
                        !isTablet && (
                          <InputAdornment position="end">
                            <HiSearch className="text-2xl cursor-pointer" />
                          </InputAdornment>
                        )
                      }
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </FormControl>
                </div>
              )}
              {storesResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.2 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="absolute top-10 left-0 w-full flex flex-col justify-start items-center gap-1 bg-slate-50 shadow-lg
                  border border-slate-200 rounded-lg z-50 py-2"
                >
                  {storesResults.map((store) => (
                    <Link
                      to={`/store/${store._id}`}
                      key={store._id}
                      className="w-full flex justify-start items-center gap-3 px-5 py-2
                      hover:bg-slate-100 cursor-pointer"
                      onClick={() => setQuery('')}
                    >
                      <img src={baseURL + '/' + store.images.logo} alt="store logo" className="w-[30px] mr-2" />
                      <h1 className="text-slate-700 font-[500] text-sm">{store.title}</h1>
                      <h1 className="text-xs text-greyLight">
                        {store.categories[0]} - {store.info.deliveryTime}&apos; - Ελάχιστη{' '}
                        {store.info.minimumOrder.toFixed(2)}€
                      </h1>
                    </Link>
                  ))}
                </motion.div>
              )}
              {isTablet && isSearchOpen && (
                <IoMdCloseCircle
                  className="text-4xl cursor-pointer"
                  onClick={() => {
                    setQuery('');
                    setIsSearchOpen(false);
                  }}
                />
              )}
            </div>
            {(!isTablet || (isTablet && !isSearchOpen)) && (
              <div className="flex justify-center items-center gap-2 md:order-1">
                <MdLocationOn className="text-2xl md:text-3xl text-orange-600" />
                <div className="flex flex-col justify-start items-start">
                  <h1 className="text-sm text-greyLight text-center hidden md:block">Διεύθυνση Παράδοσης:</h1>
                  <h1 className="md:text-sm">
                    {userInfoState?.fullAddress?.address + ' ' + (userInfoState?.fullAddress?.number || '')}
                  </h1>
                </div>
              </div>
            )}
            {(!isTablet || (isTablet && !isSearchOpen)) && (
              <div
                role="button"
                tabIndex={0}
                onKeyDown={() => {
                  setIsUserMenuOpen(!isUserMenuOpen);
                }}
                className="relative flex justify-center items-center gap-3 md:order-3"
                onClick={() => {
                  setIsUserMenuOpen(!isUserMenuOpen);
                }}
              >
                {userInfoState?.firstName && userInfoState?.lastName && (
                  <div className="hidden md:flex justify-start items-center gap-2">
                    <h1 className="text-sm">{userInfoState.firstName[0]}.</h1>
                    <h1 className="text-sm">{userInfoState.lastName}</h1>
                  </div>
                )}
                <FaUser className="text-2xl cursor-pointer" />
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      className="absolute top-[120%] right-0 bg-white p-1 rounded-md shadow-lg"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ul className="w-full flex flex-col justify-start items-start gap-1 py-3 px-1">
                        {!isNormalAccount ? (
                          <button
                            className="py-2 px-5 w-full flex justify-start items-center gap-4 hover:bg-yellowHover cursor-pointer rounded-md"
                            onClick={() => {
                              navigate('/');
                              setIsUserMenuOpen(false);
                            }}
                          >
                            <SlLogin />
                            Login
                          </button>
                        ) : (
                          <>
                            <button
                              className="py-2 px-5 w-full flex justify-start items-center gap-4 hover:bg-yellowHover cursor-pointer rounded-md"
                              onClick={() => {
                                navigate('/home');
                                setIsUserMenuOpen(false);
                              }}
                            >
                              <SlHome />
                              Home
                            </button>
                            <button
                              className="py-2 px-5 w-full flex justify-start items-center gap-4 hover:bg-yellowHover cursor-pointer rounded-md"
                              onClick={() => {
                                navigate('/profile');
                                setIsUserMenuOpen(false);
                              }}
                            >
                              <SlUser />
                              Profile
                            </button>
                            <button
                              className="py-2 px-5 w-full flex justify-start items-center gap-4 hover:bg-yellowHover cursor-pointer rounded-md"
                              onClick={() => {
                                navigate('/orders');
                                setIsUserMenuOpen(false);
                              }}
                            >
                              <SlHandbag />
                              Orders
                            </button>
                            <button
                              className="py-2 px-5 w-full flex justify-start items-center gap-4 hover:bg-yellowHover cursor-pointer rounded-md"
                              onClick={handleSignOut}
                            >
                              <SlLogout />
                              Logout
                            </button>
                          </>
                        )}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
export default Navbar;
