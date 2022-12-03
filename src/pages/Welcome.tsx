import LoginCard from '../components/LoginCard';
import Wallpaper from '../assets/images/wallpaper.jpg';

function Welcome() {
  return (
    <section
      className="relative min-h-screen h-screen w-full flex flex-col justify-start items-center
      md:flex-row-reverse md:justify-between md:items-stretch
    "
    >
      <img src={Wallpaper} alt="wallpaper food" className="h-[100%] w-full object-cover md:w-[50%]" />
      <LoginCard />
    </section>
  );
}
export default Welcome;
