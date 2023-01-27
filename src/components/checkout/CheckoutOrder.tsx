import { FaCcVisa, FaPaypal } from 'react-icons/fa';
import { FcHome, FcInfo, FcMoneyTransfer } from 'react-icons/fc';
import { GiMoneyStack } from 'react-icons/gi';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { useDeliveryContext } from '../../context/DeliveryContext';

function CheckoutOrder() {
  const { userInfoState, userInfoDispatch } = useDeliveryContext();

  const position: [number, number] = [userInfoState?.fullAddress.lat, userInfoState?.fullAddress.lng];
  return (
    <div className="w-full max-w-[600px] bg-slate-50 flex flex-col justify-between items-center gap-7 p-5 md:mt-10 rounded-lg">
      {/* Top Part */}
      <div className="w-full flex flex-col justify-start items-start gap-2">
        <h1 className="text-2xl font-[500]">Παραγγελία</h1>
        <div className="w-full">
          {/* address */}
          <div className="w-full p-3 md:p-5 bg-white rounded-lg shadow-sm flex flex-col justify-start items-stretch gap-2">
            <h1 className="text-base text-greyDark font-[500] flex justify-start items-center gap-2 mb-3 py-1 border-b border-b-1 border-b-slate-200">
              <FcHome className="text-xl" />
              Διεύθυνση Παράδοσης
            </h1>
            <div className="w-full h-[150px] md:h-[250px] z-0 rounded-lg overflow-hidden">
              <MapContainer
                center={position}
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
            <div className="mt-2">
              <p className="text-sm font-[500]">
                {userInfoState?.fullAddress.address +
                  ' ' +
                  userInfoState?.fullAddress.number +
                  ', ' +
                  userInfoState?.fullAddress.postalCode}
              </p>
              <p className="text-sm font-[400]">{userInfoState?.fullAddress.city}</p>
            </div>
          </div>
          {/* Στοιχεία Πελάτη */}
          <div className="w-full mt-5">
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
                      w-full sm:max-w-[250px] h-[30px] p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-transparent"
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
                    w-full sm:max-w-[250px] h-[30px] p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-transparent"
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
                    w-full sm:max-w-[250px] h-[30px] p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-transparent
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
                    w-full sm:max-w-[250px] h-[30px] p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-transparent
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
            </div>
          </div>
          {/* Cash */}
          <div className="w-full mt-5">
            <div className="w-full p-3 md:p-5 bg-white rounded-lg shadow-sm flex flex-col justify-start items-stretch gap-5">
              <h1 className="text-base text-greyDark font-[500] flex justify-start items-center gap-2 py-1 border-b border-b-1 border-b-slate-200">
                <FcMoneyTransfer className="text-xl" />
                Τρόπος Πληρωμής
              </h1>
              <div className="w-full px-1 text-sm text-greyDark grid grid-cols-[max-content_1fr] items-center gap-4">
                <input
                  id="cash"
                  type="radio"
                  name="payment"
                  className="w-[18px] h-[18px] rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-transparent cursor-pointer"
                  value="cash"
                  checked={userInfoState?.payment === 'cash'}
                  onChange={(e) => userInfoDispatch({ type: 'SET_PAYMENT', payload: e.target.value })}
                />
                <label htmlFor="cash" className="cursor-pointer flex justify-start items-center gap-2">
                  Μετρητά
                  <GiMoneyStack className="text-xl" />
                </label>
                <input
                  id="card"
                  type="radio"
                  name="payment"
                  className="w-[18px] h-[18px] rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-transparent cursor-pointer"
                  value="card"
                  checked={userInfoState?.payment === 'card'}
                  onChange={(e) => userInfoDispatch({ type: 'SET_PAYMENT', payload: e.target.value })}
                  disabled
                />
                <label htmlFor="card" className="cursor-pointer text-greyLight flex justify-start items-center gap-2">
                  Πιστωτική Κάρτα
                  <FaCcVisa className="text-xl" />
                </label>
                <input
                  id="paypal"
                  type="radio"
                  name="payment"
                  className="w-[18px] h-[18px] rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-transparent cursor-pointer"
                  value="paypal"
                  checked={userInfoState?.payment === 'paypal'}
                  onChange={(e) => userInfoDispatch({ type: 'SET_PAYMENT', payload: e.target.value })}
                  disabled
                />
                <label htmlFor="paypal" className="cursor-pointer text-greyLight flex justify-start items-center gap-2">
                  Paypal
                  <FaPaypal className="text-xl" />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CheckoutOrder;
