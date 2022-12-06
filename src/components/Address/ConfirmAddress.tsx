import { useDeliveryContext } from '../../context/DeliveryContext';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

function ConfirmAddress() {
  const { userInfoState } = useDeliveryContext();
  const position = [Number(userInfoState.coords_lat), Number(userInfoState.coords_lng)];

  return (
    <div className="w-full h-full flex flex-col justify-end items-center">
      <div className="w-full h-fit rounded-lg overflow-hidden">
        <MapContainer center={position} zoom={15} scrollWheelZoom={true} style={{ width: '100%', height: '300px' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} />
        </MapContainer>
      </div>
    </div>
  );
}
export default ConfirmAddress;
