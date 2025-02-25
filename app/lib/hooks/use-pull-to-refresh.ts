import { useEffect } from 'react';

const TRIGGER_THRESHOLD = 128;
const SHOW_INDICATOR_THRESHOLD = 64;
const k = 0.4;
function calcThreshold(x: number) {
  return TRIGGER_THRESHOLD * (1 - Math.exp((-k * x) / TRIGGER_THRESHOLD));
}

export function usePullToRefresh(
  ref: React.RefObject<HTMLDivElement | null>,
  onTrigger: () => void
) {
  useEffect(() => {
    if(ref == null) {
      return;
    }
    const el = ref.current;
    if (!el) return;

    // attach the event listener
    el.addEventListener("touchstart", handleTouchStart);

    function handleTouchStart(startEvent: TouchEvent) {
      const el = ref.current;
      if (!el) return;

      // get the initial Y position
      const initialY = startEvent.touches[0].clientY;

      el.addEventListener("touchmove", handleTouchMove);
      el.addEventListener("touchend", handleTouchEnd);

      function handleTouchMove(moveEvent: TouchEvent) {
        const el = ref.current;
        if (!el) return;

        // get the current Y position
        const currentY = moveEvent.touches[0].clientY;

        // get the difference
        const dy = currentY - initialY;

        const parentEl = el.parentNode as HTMLDivElement;
        console.log(dy, TRIGGER_THRESHOLD, SHOW_INDICATOR_THRESHOLD);
        if (dy > TRIGGER_THRESHOLD) {
          flipArrow(parentEl);
        } else if (dy > SHOW_INDICATOR_THRESHOLD) {
          addPullIndicator(parentEl);
        } else {
          removePullIndicator(parentEl);
        }

        // now we are using the `calcThreshold` function
        el.style.transform = `translateY(${calcThreshold(dy)}px)`;
      }

      function handleTouchEnd(endEvent: TouchEvent) {
        const el = ref.current;
        if (!el) return;

        // return the element to its initial position
        el.style.transform = "translateY(0)";
        removePullIndicator(el.parentNode as HTMLDivElement);

        // add transition
        el.style.transition = "transform 0.2s";

        // run the callback
        const y = endEvent.changedTouches[0].clientY;
        const dy = y - initialY;
        if (dy > TRIGGER_THRESHOLD) {
          onTrigger();
        }

        // listen for transition end event
        el.addEventListener("transitionend", onTransitionEnd);

        // cleanup
        el.removeEventListener("touchmove", handleTouchMove);
        el.removeEventListener("touchend", handleTouchEnd);
      }
    }

    function onTransitionEnd() {
      const el = ref.current;
      if (!el) return;

      // remove transition
      el.style.transition = "";

      // cleanup
      el.removeEventListener("transitionend", onTransitionEnd);
    }

    function addPullIndicator(el: HTMLDivElement) {
      const indicator = el.querySelector(".pull-indicator");
      if (indicator) {
        // already added
        console.log('pull indicator already added');

        // make sure the arrow is not flipped
        if (indicator.classList.contains("flip")) {
          console.log('pull indicator contains flip, removing it');

          indicator.classList.remove("flip");
        }
        return;
      }

      const pullIndicator = document.createElement("div");
      pullIndicator.className = "pull-indicator";
      //"<i class='fa-solid fa-arrow-down'></i>";
      pullIndicator.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5\" /></svg>";
      el.appendChild(pullIndicator);
    }

    function removePullIndicator(el: HTMLDivElement) {
      const pullIndicator = el.querySelector(".pull-indicator");
      if (pullIndicator) {
        console.log('removing pill indicator');

        pullIndicator.remove();
      }
    }

    function flipArrow(el: HTMLDivElement) {
      const pullIndicator = el.querySelector(".pull-indicator");
      if (pullIndicator && !pullIndicator.classList.contains("flip")) {
        console.log('flipping arrow');

        pullIndicator.classList.add("flip");
      }
    }

    return () => {
      // let's not forget to cleanup
      el.removeEventListener("touchstart", handleTouchStart);
    };
  }, [ref.current]);
}
