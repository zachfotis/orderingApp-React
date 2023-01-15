import { HashLink } from 'react-router-hash-link';

function Categories({ catalog }: { catalog: object }) {
  const scrollWithOffset = (el: HTMLElement) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
  };
  return (
    <div className="w-full flex justify-start items-center gap-5 mt-5 px-5">
      {Object.keys(catalog).map((key) => {
        return (
          <HashLink
            scroll={(el) => scrollWithOffset(el)}
            to={'#' + key}
            className="min-w-[100px] text-center px-5 py-2 border border-1 border-black bg-white rounded-lg"
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
