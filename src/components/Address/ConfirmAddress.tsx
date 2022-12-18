import { useDeliveryContext } from '../../context/DeliveryContext';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { motion } from 'framer-motion';
import useLocalStorage from '../../hooks/useLocalStorage';

function ConfirmAddress({ setShowEditAddress }: { setShowEditAddress: (value: boolean) => void }) {
  const { userInfoState, userInfoDispatch } = useDeliveryContext();
  const { setValue } = useLocalStorage('address', JSON.stringify(userInfoState.fullAddress));
  const position: [number, number] = [Number(userInfoState.fullAddress.lat), Number(userInfoState.fullAddress.lng)];

  return (
    <motion.div
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0, y: '-100%' }}
      className="relative w-full min-h-full flex flex-col justify-start items-center gap-5"
    >
      <div className="relative w-full h-[50%] overflow-hidden">
        <MapContainer center={position} zoom={15} scrollWheelZoom={true} style={{ width: '100%', height: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} />
        </MapContainer>
      </div>
      <div className="w-full max-w-[500px] flex flex-col rounded-lg justify-center items-start gap-5 px-5">
        <div className="w-full flex flex-col justify-start items-center gap-1">
          <h1 className="w-full text-2xl font-bold text-slate-900 text-center">
            {userInfoState.fullAddress.address} {userInfoState.fullAddress.number}
          </h1>
          <h1 className="w-full text-sm text-center text-greyLight">
            {userInfoState.fullAddress.area !== userInfoState.fullAddress.city ? userInfoState.fullAddress.area : ''}
            {userInfoState.fullAddress.postalCode}, {userInfoState.fullAddress.city}
          </h1>
        </div>
        <div className="w-full flex flex-col justify-start items-center gap-3">
          <button
            className="bg-yellow text-black w-full py-3 rounded-lg font-[500] text-sm hover:bg-yellowHover disabled:bg-greyLight"
            onClick={() => {
              userInfoDispatch({ type: 'SET_ADDRESS_CONFIRMED', payload: true });
              setValue(JSON.stringify({ ...userInfoState.fullAddress, confirmed: true }));
            }}
          >
            Επιβεβαίωση Διεύθυνσης
          </button>
          <button
            className="bg-white text-black w-full p-3 rounded-lg font-[500] text-sm flex justify-start items-center border border-greyLight"
            onClick={() => {
              setShowEditAddress(true);
            }}
          >
            <p className="w-full">Επεξεργασία</p>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
export default ConfirmAddress;
