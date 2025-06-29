import { ReactNode } from "react";
import { ThemeContextProvider } from "@/context/ThemeContext";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeContextProvider>
      {children}
    </ThemeContextProvider>
  );
};
