export const getPath = (gmaps, linePath) => gmaps.geometry.encoding.decodePath(decodeURI(linePath))
