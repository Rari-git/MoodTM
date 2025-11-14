import React, { createContext, useContext } from "react";

type ThemeType = {
  fonts: {
    regular: string;
    bold: string;
  };
};

const ThemeContext = createContext<ThemeType>({
  fonts: {
    regular: "Poppins-Regular",
    bold: "Poppins-Bold",
  },
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContext.Provider
      value={{
        fonts: {
          regular: "Poppins-Regular",
          bold: "Poppins-Bold",
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
