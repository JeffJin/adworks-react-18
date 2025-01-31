'use client';

import { useState, useRef, useEffect } from 'react';

export default function VideoPlayer({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if(ref.current) {
      isPlaying ? ref.current.play() : ref.current.pause();
    }
  }, [isPlaying]);

  return (
    <>
      <video width="400" onClick={() => setIsPlaying(!isPlaying)} ref={ref} src={src} loop playsInline/>
      <progress value={0.9}/>
    </>
  );

}
