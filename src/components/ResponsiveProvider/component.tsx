import React, { createContext, useContext, useState, useEffect } from "react";

interface ResponsiveContextData {
  isSmall: boolean;
  isMedium: boolean;
  isLarge: boolean;
}

export const ResponsiveContext = createContext<ResponsiveContextData>({
  isSmall: true, // Default to mobile
  isMedium: false,
  isLarge: false,
});

export function ResponsiveProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [size, setSize] = useState<ResponsiveContextData>({
    isSmall: true, // Default to mobile
    isMedium: false,
    isLarge: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.matchMedia("(max-width: 600px)").matches;
      const isMedium = window.matchMedia(
        "(min-width: 601px) and (max-width: 900px)"
      ).matches;
      const isLarge = window.matchMedia("(min-width: 901px)").matches;
      setSize({ isSmall, isMedium, isLarge });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ResponsiveContext.Provider value={size}>
      {children}
    </ResponsiveContext.Provider>
  );
}
