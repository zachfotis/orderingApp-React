import { HashLink } from 'react-router-hash-link';

function Categories({ catalog }: { catalog: object }) {
  const scrollWithOffset = (el: HTMLElement) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -150;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
  };

  return (
    <div className="sticky z-10 top-[62px] md:top-[78px] left-0 w-full flex justify-start items-center gap-5 p-5 overflow-x-auto bg-white shadow-sm snap-x snap-mandatory">
      {Object.keys(catalog).map((key) => {
        return (
          <HashLink
            scroll={(el) => scrollWithOffset(el)}
            to={'#' + key}
            className="min-w-[100px] shrink-0 text-center px-1 py-1 border border-1 border-yellow bg-yellow rounded-lg shadow-md text-sm snap-center  
            hover:bg-yellowHover hover:border-greyDark hover:shadow-lg
            "
            key={'categories-' + key}
          >
            {key}
          </HashLink>
        );
      })}
    </div>
  );
}
export default Categories;
