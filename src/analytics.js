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

export const getExactLocation = () => {
  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );
    const data = await res.json();

    const city =
      data.address.city ||
      data.address.town ||
      data.address.village ||
      "Unknown";

    ReactGA.event({
      category: "User",
      action: "Exact Location",
      label: city,
    });
  });
};


