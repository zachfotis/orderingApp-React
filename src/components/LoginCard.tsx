import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { BiSearchAlt2 } from 'react-icons/bi';
import { FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { MdEmail } from 'react-icons/md';

function LoginCard() {
  return (
    <div
      className="bg-slate-50 p-5 w-[90%] rounded-xl flex flex-col justify-start items-center gap-7
      absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"
    >
      <h1 className="text-2xl font-[500] w-full text-center">
        Παράγγειλε <br /> Delivery <br /> online σε 1&apos;
      </h1>
      <div className="w-full flex flex-col justify-start items-center gap-5">
        <FormControl variant="outlined" className="w-full">
          <InputLabel htmlFor="address-input">Διεύθυνση</InputLabel>
          <OutlinedInput
            id="address-input"
            type="text"
            label="Διεύθυνση"
            endAdornment={
              <InputAdornment position="end">
                <BiSearchAlt2 className="text-2xl cursor-pointer" />
              </InputAdornment>
            }
          />
        </FormControl>
        <button className="bg-yellow text-black w-full py-3 rounded-lg font-[500] text-sm hover:bg-yellowHover">
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
        Με την εγγραφή ή σύνδεση συμφωνέις με τους <u>Όροι Χρήσης</u> και <u>Πολιτική Απορρήτου</u>
      </p>
    </div>
  );
}
export default LoginCard;
