// @flow

import {
  getStationMarkerIcon,
  getStationIcon,
  getPositionIcon
} from "../../selectors/constants";

export const getStationMarkerOptions = ({ station }: any, marker: any) => {
  const isSelected = marker.id === station.id;
  return {
    position: marker.position,
    zIndex: isSelected ? 9999 : 0,
    optimized: false,
    icon: {
      url: getStationMarkerIcon(isSelected),
      size: new google.maps.Size(32, 32), // eslint-disable-line
      anchor: new google.maps.Point(16, 16) // eslint-disable-line
    }
  };
};

export const getPositionMarkerOptions = (marker: any) => ({
  position: marker.position,
  icon: {
    url: marker.moviendose
      ? getPositionIcon(marker.direction.color)
      : getPositionIcon("danger"),
    anchor: new google.maps.Point(12, 12) // eslint-disable-line
  }
});

export const getStationInfoWindowContent = (
  { station }: any,
  infoWindow: any
) => {
  const isSelected = infoWindow.id === station.id;
  return `
  <table style='margin-top: 5px'>
    <tbody>
        <tr>
        <td>
          <img alt='station' src='${getStationIcon(isSelected)}' width='48px' />
        </td>
        <td style='vertical-align: middle'>
          <a style='font-size: 16px; font-weight: 400; color: #333; margin-left: 5px'>Estacion ${infoWindow.name}</a>
        </td>
        </tr>
    </tbody>
  </table>
`;
};

export const getPositionInfoWindowContent = ({ direction }: any) => `
  <span style='margin: 10px 5px 8px 5px' class='tag is-${direction.color} is-medium'>Destino ${direction.name}</span>
`;
