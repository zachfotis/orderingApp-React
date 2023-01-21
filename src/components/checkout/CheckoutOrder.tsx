import { MdOutlineDeliveryDining } from 'react-icons/md';

function CheckoutOrder() {
  return (
    <div className="w-[400px] bg-slate-50 flex flex-col justify-between items-center gap-7 p-5 mt-10 rounded-lg">
      {/* Top Part */}
      <div className="w-full flex flex-col justify-start items-start gap-2">
        <h1 className="text-2xl font-[500]">Παραγγελία</h1>
        <div className="flex justify-start items-center gap-2">
          <MdOutlineDeliveryDining className="text-sm text-gray-500" />
          <p className="text-xs font-[400]">Delivery</p>
        </div>
      </div>
    </div>
  );
}
export default CheckoutOrder;
