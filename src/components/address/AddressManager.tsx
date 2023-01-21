import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDeliveryContext } from '../../context/DeliveryContext';
import AddressLayout from './AddressLayout';
import ConfirmAddress from './ConfirmAddress';
import EditAddress from './EditAddress';
import SearchAddress from './SearchAddress';

function AddressManager({ setShowAddressManager }: { setShowAddressManager: (value: boolean) => void }) {
  const { userInfoState } = useDeliveryContext();
  const [showSearchAddress, setShowSearchAddress] = useState(true);
  const [showConfirmAddress, setShowConfirmAddress] = useState(false);
  const [showEditAddress, setShowEditAddress] = useState(false);

  useEffect(() => {
    if (
      userInfoState.fullAddress.address &&
      userInfoState.fullAddress.lat &&
      userInfoState.fullAddress.lng &&
      !userInfoState.fullAddress.confirmed &&
      !showEditAddress
    ) {
      setShowSearchAddress(false);
      setShowConfirmAddress(true);
    } else if (
      userInfoState.fullAddress.address &&
      userInfoState.fullAddress.lat &&
      userInfoState.fullAddress.lng &&
      userInfoState.fullAddress.confirmed &&
      !showEditAddress
    ) {
      setShowAddressManager(false);
    } else if (
      userInfoState.fullAddress.address &&
      userInfoState.fullAddress.lat &&
      userInfoState.fullAddress.lng &&
      showEditAddress
    ) {
      setShowSearchAddress(false);
      setShowConfirmAddress(false);
      setShowEditAddress(true);
    }
  }, [userInfoState, showEditAddress, setShowAddressManager]);

  return (
    <AddressLayout setShowAddressManager={setShowAddressManager}>
      <AnimatePresence mode="wait">
        {showSearchAddress && <SearchAddress key="search-address" />}
        {showConfirmAddress && <ConfirmAddress setShowEditAddress={setShowEditAddress} key="confirm-address" />}
        {showEditAddress && <EditAddress setShowEditAddress={setShowEditAddress} key="edit-address" />}
      </AnimatePresence>
    </AddressLayout>
  );
}
export default AddressManager;
