import './Loader.css';

interface LoaderProps {
  text?: string;
  variant?: 'normal' | 'server';
}

function Loader({ text = 'Loading...', variant = 'normal' }: LoaderProps) {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-5">
      <span className={variant}></span>
      <p>{text}</p>
    </div>
  );
}
export default Loader;
