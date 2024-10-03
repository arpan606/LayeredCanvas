import { useState, useEffect } from "react";

const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const checkScreenSize = () => {
    const mobile = window.matchMedia("(max-width: 650px)").matches;
    const tablet = window.matchMedia(
      "(min-width: 650px) and (max-width: 1024px)"
    ).matches;
    const desktop = window.matchMedia("(min-width: 1025px)").matches;

    setIsMobile(mobile);
    setIsTablet(tablet);
    setIsDesktop(desktop);
  };

  useEffect(() => {
    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return { isMobile, isTablet, isDesktop };
};

export default useResponsive;
