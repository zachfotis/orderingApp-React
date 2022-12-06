import { useFirebaseContext } from '../context/FirebaseContext';
import { FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { MdEmail } from 'react-icons/md';

import { useNavigate } from 'react-router-dom';

function LoginCard() {
  const { user } = useFirebaseContext();
  const navigate = useNavigate();

  return (
    <div
      className="bg-slate-50 p-5 w-[90%] rounded-xl flex justify-center items-center
      absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2
      md:static md:transform-none md:top-0 md:left-0 md:w-full"
    >
      <div className="flex flex-col justify-start items-center gap-7 md:justify-center md:p-10 md:max-w-[800px]">
        <h1 className="text-2xl font-[500] w-full text-center md:text-4xl">
          Παράγγειλε <br className="md:hidden" /> Delivery <br /> online σε 1&apos;
        </h1>
        <div
          className="w-full flex flex-col justify-start items-center gap-5"
          onClick={() => navigate('/new-address')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && navigate('/new-address')}
        >
          <button
            className="bg-yellow text-black w-full py-3 rounded-lg font-[500] text-sm hover:bg-yellowHover disabled:bg-greyLight"
            disabled={!user}
          >
            Παράγγειλε τώρα
          </button>
        </div>

        <div className="w-full flex flex-col justify-start items-center gap-4">
          <p className="w-full text-sm text-left text-greyLight">Σύνδεση ή δημιουργία λογαριασμού</p>

          <button className="bg-blue text-white w-full p-3 rounded-lg font-[500] text-sm flex justify-start items-center">
            <FaFacebookF className="text-2xl" />
            <p className="w-full">Σύνδεση με Facebook</p>
          </button>

          <button className="bg-white text-black w-full p-3 rounded-lg font-[500] text-sm flex justify-start items-center border border-greyLight">
            <FcGoogle className="text-2xl" />
            <p className="w-full">Σύνδεση με Google</p>
          </button>

          <button className="bg-white text-black w-full p-3 rounded-lg font-[500] text-sm flex justify-start items-center border border-greyLight">
            <MdEmail className="text-2xl" />
            <p className="w-full">Σύνδεση/Εγγραφή με Email</p>
          </button>
        </div>

        <p className="w-full text-sm text-center text-greyDark">
          Με την εγγραφή ή σύνδεση συμφωνείς με τους <u className="cursor-pointer">Όροι Χρήσης</u> και{' '}
          <u className="cursor-pointer">Πολιτική Απορρήτου</u>
        </p>
      </div>
    </div>
  );
}
export default LoginCard;
