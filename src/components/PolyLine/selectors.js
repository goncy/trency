export const getPath = (google, linePath) => google.maps.geometry.encoding.decodePath(decodeURI(linePath))
