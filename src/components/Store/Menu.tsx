import { FcMenu } from 'react-icons/fc';

function Menu({ catalog }: { catalog: object }) {
  const catalogKeys = Object.keys(catalog) as Array<keyof typeof catalog>;

  return (
    <div className="w-full">
      {catalogKeys.map((key) => {
        return (
          <div key={'menu-' + key} id={key} className="w-full px-5 my-10">
            <div className="w-full flex justify-start items-center gap-3 border-b border-b-1 border-b-dashed border-b-greyLight mb-2 py-2">
              <FcMenu className="text-2xl text-black" />
              <h1 className="w-full text-start text-lg font-[500]">{key}</h1>
            </div>
            <div className="w-full flex flex-col justify-start items-start gap-5 px-2">
              {catalog[key].map((item, index: number) => {
                return (
                  <div key={'menu-item-' + item.name} className="w-full mt-5">
                    <div className="w-full flex justify-between items-start gap-2 cursor-pointer hover:bg-slate-100 hover:bg-opacity-30 ">
                      <div className=" flex flex-col justify-start items-start gap-2">
                        <h1 className="text-base font-[500]">{item.name}</h1>
                        <p className="text-sm font-[400] text-greyLight">{item.description}</p>
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
                  </div>
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
