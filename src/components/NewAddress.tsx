import { useNavigate } from 'react-router-dom';
import { MdArrowBackIos as BackArrow } from 'react-icons/md';
import AddressInput from './Address/AddressInput';

function NewAddress() {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-50 py-7 px-5 w-full min-h-screen rounded-xl flex flex-col justify-start items-start gap-5">
      <BackArrow className="text-3xl ml-2 mb-2 cursor-pointer" onClick={() => navigate(-1)} />
      <h1 className="text-2xl font-[500] w-full text-left md:text-4xl">Βάλε την διεύθυνση σου</h1>
      <AddressInput />
    </div>
  );
}
export default NewAddress;
