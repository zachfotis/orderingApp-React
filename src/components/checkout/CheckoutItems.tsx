import { useDeliveryContext } from '../../context/DeliveryContext';

function CheckoutItems() {
  const { basketState } = useDeliveryContext();
  return (
    <div className="flex-1 w-full h-full overflow-y-auto">
      {basketState?.totalItems.length > 0 && (
        <div className="flex flex-col justify-start items-start gap-3">
          {basketState.totalItems.map((item, index) => (
            <div
              key={item.itemName + index}
              className="w-full flex flex-col justify-center items-start gap-5 p-3 shadow-sm rounded-lg bg-white"
            >
              <div className="w-full flex justify-between items-center gap-3">
                <p className="text-sm text-greyDark font-[500]">{item.quantity}</p>
                <p className="w-full text-sm text-greyDark font-[400] text-start">{item.itemName}</p>
                <p className="text-sm text-greyDark font-[400]">{(item.itemPrice * item.quantity).toFixed(2)}€</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default CheckoutItems;
