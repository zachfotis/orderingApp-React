import './Loader.css';

interface LoaderProps {
  text?: string;
}

function LoaderSmall({ text = 'Loading...' }: LoaderProps) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-5">
      <span className="loader"></span>
      <p>{text}</p>
    </div>
  );
}
export default LoaderSmall;
