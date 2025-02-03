import { FadeInAnimation } from '@/app/ui/common/fade-in-animation';
import { RefObject, useEffect } from 'react';

export function useFadeIn(ref: RefObject<any>, duration: number) {
  useEffect(() => {
    const animation = new FadeInAnimation(ref.current);
    animation.start(duration);
    return () => {
      animation.stop();
    };
  }, [ref, duration]);
}


// function useAnimationLoop(isRunning: boolean, drawFrame) {
//   const onFrame = useEffectEvent(drawFrame);
//
//   useEffect(() => {
//     if (!isRunning) {
//       return;
//     }
//
//     const startTime = performance.now();
//     let frameId = null;
//
//     function tick(now) {
//       const timePassed = now - startTime;
//       onFrame(timePassed);
//       frameId = requestAnimationFrame(tick);
//     }
//
//     tick();
//     return () => cancelAnimationFrame(frameId);
//   }, [isRunning]);
// }
