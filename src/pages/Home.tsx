import Categories from '../components/home/Categories';
import Navbar from '../components/layout/Navbar';

function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center">
      <Navbar />
      <div className="w-full max-w-[1280px] flex flex-col justify-start items-start">
        <Categories />
      </div>
    </div>
  );
}
export default Home;
