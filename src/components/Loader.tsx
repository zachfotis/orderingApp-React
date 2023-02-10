import { useEffect } from 'react';
import './Loader.css';

interface LoaderProps {
  text?: string;
  variant?: 'normal' | 'server';
}

function Loader({ text = 'Loading...', variant = 'normal' }: LoaderProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-white flex flex-col justify-center items-center gap-5 z-[1000]">
      <span className={variant}></span>
      <p>{text}</p>
    </div>
  );
}
export default Loader;
