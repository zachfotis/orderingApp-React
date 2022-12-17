import { useEffect, useState } from 'react';
import { useDeliveryContext } from '../../context/DeliveryContext';
import AddressLayout from './AddressLayout';
import ConfirmAddress from './ConfirmAddress';
import SearchAddress from './SearchAddress';

function AddressManager({ setShowAddressManager }: { setShowAddressManager: (value: boolean) => void }) {
  const { userInfoState } = useDeliveryContext();
  const [showSearchAddress, setShowSearchAddress] = useState(true);
  const [showConfirmAddress, setShowConfirmAddress] = useState(false);

  useEffect(() => {
    if (
      userInfoState.address &&
      userInfoState.coords_lat &&
      userInfoState.coords_lng &&
      !userInfoState.addressConfirmed
    ) {
      setShowSearchAddress(false);
      setShowConfirmAddress(true);
    } else if (
      userInfoState.address &&
      userInfoState.coords_lat &&
      userInfoState.coords_lng &&
      userInfoState.addressConfirmed
    ) {
      setShowAddressManager(false);
    }
  }, [userInfoState]);

  return (
    <AddressLayout setShowAddressManager={setShowAddressManager}>
      {showSearchAddress && <SearchAddress />}
      {showConfirmAddress && <ConfirmAddress />}
    </AddressLayout>
  );
}
export default AddressManager;
