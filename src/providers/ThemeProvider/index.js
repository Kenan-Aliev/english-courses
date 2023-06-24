import darkScrollbar from "@mui/material/darkScrollbar";

export const tokensLight = {
  grey: {
    0: "#000000", // manually adjusted
    10: "#141414", // manually adjusted
    50: "#292929", // manually adjusted
    100: "#3d3d3d",
    200: "#525252",
    300: "#666666",
    400: "#858585",
    500: "#a3a3a3",
    600: "#c2c2c2",
    700: "#e0e0e0",
    800: "#f0f0f0",
    900: "#f6f6f6",
    1000: "#ffffff", // manually adjusted
  },
  primary: {
    // blue
    100: "#070812",
    200: "#0d1025",
    300: "#141937",
    400: "#141b2d", // manually adjusted
    500: "#1F2A40",
    600: "#4d547d",
    700: "#7a7f9d",
    800: "#a6a9be",
    900: "#d3d4de",
  },
  secondary: {
    // yellow
    50: "#332a14",
    100: "#665429",
    200: "#997d3d",
    300: "#cca752",
    400: "#ffd166",
    500: "#ffda85",
    600: "#ffe3a3",
    700: "#ffedc2",
    800: "#fff6e0",
    900: "#f0f0f0",
  },
  greenAccent: {
    100: "#0f2922",
    200: "#1e5245",
    300: "#2e7c67",
    400: "#3da58a",
    500: "#4cceac",
    600: "#70d8bd",
    700: "#94e2cd",
    800: "#b7ebde",
    900: "#dbf5ee",
  },
  redAccent: {
    100: "#2c100f",
    200: "#58201e",
    300: "#832f2c",
    400: "#af3f3b",
    500: "#db4f4a",
    600: "#e2726e",
    700: "#e99592",
    800: "#f1b9b7",
    900: "#f8dcdb",
  },
  blueAccent: {
    100: "#151632",
    200: "#2a2d64",
    300: "#3e4396",
    400: "#535ac8",
    500: "#6870fa",
    600: "#868dfb",
    700: "#a4a9fc",
    800: "#c3c6fd",
    900: "#e1e2fe",
  },
};

export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      primary: {
        ...tokensLight.primary,
        main: tokensLight.primary[400],
        light: tokensLight.primary[400],
      },
      secondary: {
        ...tokensLight.secondary,
        main: tokensLight.secondary[300],
      },
      neutral: {
        ...tokensLight.grey,
        main: tokensLight.grey[800],
      },
      background: {
        default: tokensLight.primary[500],
        alt: tokensLight.primary[500],
      },
    },
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: (themeParam) => ({
          body: darkScrollbar(),
        }),
      },
    },
  };
};
