// @flow

import {getBranchColor} from '../../selectors'

export const getStationMarkerOptions = ({gmaps, preferences}: any, station: any) => {
  const isSelected = station.id === preferences.station.id
  return {
    position: station.position,
    zIndex: isSelected ? 9999 : 0,
    icon: new gmaps.MarkerImage(
      `/station${isSelected ? '-seleccionada' : ''}-marker.svg`,
      new gmaps.Size(15, 15),
      null,
      new gmaps.Point(7.5, 7.5)
    )
  }
}

export const getPositionMarkerOptions = ({gmaps, preferences}: any, train: any) => ({
  position: train.position,
  icon: new gmaps.MarkerImage(
    `/train-${getBranchColor(preferences.branch, train.branch)}.svg`,
    null,
    null,
    new gmaps.Point(12, 12)
  )
})

export const getStationInfoWindowContent = ({preferences}: any, station: any) => {
  const isSelected = station.id === preferences.station.id
  return `
  <table style='margin-top: 5px'>
    <tbody>
        <tr>
        <td>
          <img alt='station' src='/station${isSelected ? '-seleccionada' : ''}-icon.svg' width='48px' />
        </td>
        <td style='vertical-align: middle'>
          <a style='font-size: 16px; font-weight: 400; color: #333; margin-left: 5px'>Estacion ${station.name}</a>
        </td>
        </tr>
    </tbody>
  </table>
`
}
