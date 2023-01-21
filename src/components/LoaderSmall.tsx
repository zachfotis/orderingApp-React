import './LoaderSmall.css';

interface LoaderProps {
  text?: string;
}

function LoaderSmall({ text = 'Loading...' }: LoaderProps) {
  return (
    <div className="flex-1 w-full h-full flex flex-col justify-center items-center gap-5">
      <span className="loaderSmall"></span>
      <p className="text-sm text-greyDark">{text}</p>
    </div>
  );
}
export default LoaderSmall;
