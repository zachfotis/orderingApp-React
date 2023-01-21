import { FcMenu } from 'react-icons/fc';
import { useDeliveryContext } from '../../context/DeliveryContext';

import { Catalog, MenuItem } from '../../types';

function Menu({ catalog }: { catalog: Catalog }) {
  const { setActiveMenuItem, setShowOptions, setReplaceMenuItem } = useDeliveryContext();

  const handleMenuItemOptions = (item: MenuItem) => {
    setReplaceMenuItem(null);
    setShowOptions(true);
    setActiveMenuItem(item);
  };

  return (
    <div className="w-full">
      {Object.keys(catalog).map((key) => {
        return (
          <div key={'menu-' + key} id={key} className="w-full px-5 my-10">
            <div className="w-full flex justify-start items-center gap-3 border-b border-b-1 border-b-dashed border-b-greyLight mb-2 py-2">
              <FcMenu className="text-2xl text-black" />
              <h1 className="w-full text-start text-lg font-[500]">{key}</h1>
            </div>
            <div className="w-full flex flex-col justify-start items-start gap-5 px-2">
              {catalog[key].map((item: MenuItem, index: number) => {
                return (
                  <button
                    key={'menu-item-' + item.name}
                    className="w-full mt-5"
                    onClick={() => {
                      handleMenuItemOptions(item);
                    }}
                  >
                    <div className="w-full flex justify-between items-start gap-3 cursor-pointer hover:bg-slate-100 hover:bg-opacity-30 ">
                      <div className="flex flex-col justify-start items-start gap-2">
                        <h1 className="text-base font-[500]">{item.name}</h1>
                        <p className="text-sm text-start font-[400] text-greyLight">{item.description}</p>
                        <p className="text-base font-[400]">Από {item.price}€</p>
                      </div>
                      <img
                        src={`https://source.unsplash.com/100x100/?${item.name},food,coffee`}
                        alt=""
                        className="w-[100px] h-[100px] object-cover rounded-md"
                      />
                    </div>
                    {catalog[key].length - 1 !== index && (
                      <p className="w-full h-[1px] bg-greyLight opacity-25 mt-5"></p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default Menu;
