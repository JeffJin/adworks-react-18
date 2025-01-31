'use client'

import './styles.scss';
import TicToc from "@/app/games/tictoc";
import Canvas from '@/app/ui/common/canvas';
import { useRef } from 'react';

export default function Home() {
  const pointerContainerRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <TicToc/>
      <br/>
      <hr/>
      <br/>
      <div className="pointer-container" ref={pointerContainerRef}>
        <Canvas ref={pointerContainerRef}/>
      </div>
    </>
  );
}

