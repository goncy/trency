/* global google */

export const getPath = linePath =>
  google.maps.geometry.encoding.decodePath(decodeURI(linePath))
