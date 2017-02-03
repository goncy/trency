// @flow

import {getBranchColor, getBranchDirection} from '../../selectors/constants'

export const getStationMarkerOptions = ({gmaps, station}: any, marker: any) => {
  const isSelected = marker.id === station.id
  return {
    position: marker.position,
    zIndex: isSelected ? 9999 : 0,
    optimized: false,
    icon: {
      url: `${process.env.PUBLIC_URL || ''}/station${isSelected ? '-seleccionada' : ''}-marker.svg`,
      size: new gmaps.Size(32, 32),
      anchor: new gmaps.Point(16, 16)
    }
  }
}

export const getPositionMarkerOptions = ({gmaps, branch}: any, marker: any) => ({
  position: marker.position,
  icon: {
    url: `${process.env.PUBLIC_URL || ''}/train-${getBranchColor(branch, marker.branch)}.svg`,
    anchor: new gmaps.Point(12, 12)
  }
})

export const getStationInfoWindowContent = ({station}: any, infoWindow: any) => {
  const isSelected = infoWindow.id === station.id
  return `
  <table style='margin-top: 5px'>
    <tbody>
        <tr>
        <td>
          <img alt='station' src='${process.env.PUBLIC_URL || ''}/station${isSelected ? '-seleccionada' : ''}-icon.svg' width='48px' />
        </td>
        <td style='vertical-align: middle'>
          <a style='font-size: 16px; font-weight: 400; color: #333; margin-left: 5px'>Estacion ${infoWindow.name}</a>
        </td>
        </tr>
    </tbody>
  </table>
`
}

export const getPositionInfoWindowContent = ({branch}: any, position: any) => {
  const direction = getBranchDirection(branch, position.branch)
  return `
    <span style='margin: 10px 5px 8px 5px' class='tag is-${direction.color} is-medium'>Destino ${direction.name}</span>
  `
}
