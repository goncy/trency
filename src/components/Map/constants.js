export const MAP_DEFAULT_OPTIONS = {
  center: { lat: -34.764643, lng: -58.207313 },
  zoom: 12,
  minZoom: 10,
  fullscreenControl: false,
  mapTypeControlOptions: {
    position: 11,
    style: 1,
    mapTypeIds: ["roadmap", "hybrid"]
  },
  zoomControlOptions: {
    style: 2,
    position: 8
  },
  styles: [
    {
      featureType: "road",
      stylers: [{ visibility: "simplified" }]
    },
    {
      featureType: "poi",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "administrative",
      stylers: [
        { gamma: 0.6 },
        { lightness: 56 },
        { saturation: -100 },
        { visibility: "on" },
        { weight: 3.6 }
      ]
    },
    {
      featureType: "water",
      stylers: [{ gamma: 0.79 }, { saturation: -47 }]
    },
    {
      featureType: "road.highway",
      stylers: [
        { visibility: "simplified" },
        { hue: "#ff9900" },
        { saturation: -65 },
        { lightness: -17 },
        { weight: 0.9 },
        { gamma: 2.4 }
      ]
    },
    {
      featureType: "road.arterial",
      stylers: [
        { visibility: "on" },
        { weight: 0.6 },
        { hue: "#ff8800" },
        { lightness: -11 },
        { saturation: 26 },
        { gamma: 1.66 }
      ]
    },
    {
      featureType: "road.local",
      stylers: [
        { visibility: "simplified" },
        { lightness: -33 },
        { gamma: 3.6 }
      ]
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        { visibility: "on" },
        { lightness: -47 },
        { gamma: 5.06 },
        { saturation: -43 }
      ]
    }
  ]
};
