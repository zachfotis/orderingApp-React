import { BsStarFill, BsStar } from 'react-icons/bs';

function Starred({ isStarred }: { isStarred: boolean }) {
  return (
    <div className="flex justify-center items-center gap-1">
      {isStarred ? (
        <BsStarFill className="text-yellow text-3xl cursor-pointer" />
      ) : (
        <BsStar className="text-yellow text-3xl cursor-pointer" />
      )}
    </div>
  );
}
export default Starred;
