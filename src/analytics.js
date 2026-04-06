import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-8VXF6GJJD4"); // 🔥 replace with your ID
};

export const trackPage = (path) => {
  ReactGA.send({
    hitType: "pageview",
    page: path,
  });
};