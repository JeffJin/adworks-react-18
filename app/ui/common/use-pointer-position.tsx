import { useState, useEffect, RefObject } from 'react';

export function usePointerPosition(ref: RefObject<HTMLDivElement | null>) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    console.log('use effect inside pointerPostion');
    function handleMove(e: any) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
    ref.current?.addEventListener('pointermove', handleMove);
    return () => ref.current?.removeEventListener('pointermove', handleMove);
  }, [ref]);
  return position;
}

export function useDelayedValue(value: {x: number, y: number}, delay: number) {
  const [delayedValue, setDelayedValue] = useState(value);
  useEffect(() => {
    setTimeout(() => {
      setDelayedValue(value);
    }, delay);
  }, [value, delay]);

  return delayedValue;
}
