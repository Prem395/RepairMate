import { useEffect, useRef } from "react";

export const useLocomotivePage = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    let locomotiveInstance;
    let isCancelled = false;
    let updateTimeout;

    const initScroll = async () => {
      if (!scrollRef.current) {
        return;
      }

      const { default: LocomotiveScroll } = await import("locomotive-scroll");

      if (isCancelled || !scrollRef.current) {
        return;
      }

      locomotiveInstance = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
        lerp: 0.1,
        tablet: {
          smooth: true,
        },
        smartphone: {
          smooth: true,
        },
      });

      locomotiveInstance.scrollTo("top", {
        duration: 0,
        disableLerp: true,
      });

      updateTimeout = window.setTimeout(() => {
        locomotiveInstance?.update();
      }, 200);
    };

    initScroll();

    return () => {
      isCancelled = true;

      if (updateTimeout) {
        window.clearTimeout(updateTimeout);
      }

      locomotiveInstance?.destroy();
    };
  }, []);

  return scrollRef;
};
