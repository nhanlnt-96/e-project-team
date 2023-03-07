import { useEffect, useState } from 'react';

interface IWindowSize {
  width: number;
  height: number;
}

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<IWindowSize>({
    width: 0,
    height: 0
  });

  useEffect(() => {
    const handleGetWindowSize = () => {
      setWindowSize({ height: window.innerHeight, width: window.innerWidth });
    };

    window.addEventListener('resize', () => handleGetWindowSize());

    handleGetWindowSize();

    return () => {
      window.removeEventListener('resize', () => handleGetWindowSize());
    };
  }, []);

  return windowSize;
};
