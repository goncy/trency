// @flow
import {getRamalColor} from '../../selectors'

export const getMarker = ({google, tren, preferences, map}: any) => new google.maps.Marker({
  map,
  position: new google.maps.LatLng(tren.position),
  name: 'Should implement!',
  icon: new google.maps.MarkerImage(
    `/tren-${getRamalColor(preferences.ramal, tren.ramal)}.svg`,
    null,
    null,
    new google.maps.Point(12, 12)
  ),
  zIndex: 999
})
