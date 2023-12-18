import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

export const margins = {
  margin: "15px 0px 5px 0px",
};

export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        primary: {
          main: "#2c75ff",
        },
        secondary: {
          main: "#a2d729",
        },
        white: {
          main: "#fcfcfc",
        },
        black: {
          main: "#1d1d1b",
        },
        red: {
          main: "#F44336",
        },
        text: {
          primary: "#1d1d1b",
          secondary: "#858585",
        },
        dark_bg: {
          main: "#2d2a32",
        },
      }
    : {
        primary: {
          // main: "#7e13a4",
          main: "#701192",
        },
        secondary: {
          main: "#a2d729",
        },
        white: {
          main: "#fcfcfc",
        },
        black: {
          main: "#1d1d1b",
        },
        red: {
          main: "#F44336",
        },
        text: {
          primary: "#000000",
          secondary: "#858585",
          tertiary: "#FFFFFF",
        },
        dark_bg: {
          main: "#2d2a32",
        },
      }),
});

export const themeSettings = (mode) => {
  const colors = tokens(mode);

  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            dark_bg: {
              main: colors.dark_bg.main,
            },
            black: {
              main: colors.black.main,
            },
            primary: {
              main: colors.primary.main,
            },
            white: {
              main: colors.white.main,
            },
            red: {
              main: colors.red.main,
            },
            text: {
              white: colors.text.primary,
              grey: colors.text.secondary,
              black: colors.text.tertiary,
            },
            background: {
              default: colors.dark_bg.main,
            },
          }
        : {
            dark_bg: {
              main: colors.dark_bg.main,
            },
            black: {
              main: colors.black.main,
            },
            primary: {
              main: colors.primary.main,
            },
            white: {
              main: colors.white.main,
            },
            red: {
              main: colors.red.main,
            },
            text: {
              black: colors.text.primary,
              grey: colors.text.secondary,
              white: colors.text.tertiary,
            },
            background: {
              default: colors.white.main,
            },
          }),
    },
    typography: {
      fontFamily: ["Quicksand", "Ubuntu", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Quicksand", "Ubuntu", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Quicksand", "Ubuntu", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Quicksand", "Ubuntu", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Quicksand", "Ubuntu", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Quicksand", "Ubuntu", "sans-serif"].join(","),
        fontSize: 18,
      },
      h6: {
        fontFamily: ["Quicksand", "Ubuntu", "sans-serif"].join(","),
        fontSize: 14,
      },
      subtitle2: {
        fontFamily: ["Quicksand", "Ubuntu", "sans-serif"].join(","),
        fontSize: 12,
      },
    },
  };
};

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "dark" ? "light" : "dark")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
