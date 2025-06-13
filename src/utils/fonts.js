import localfont from "next/font/local";
export const satoshi = localfont({
  src: [
    {
      path: "../../public/fonts/Satoshi-Regular.woff",
      style: "",
      weight: "400",
    },
  ],
  variable: "--font-satoshi",
});
