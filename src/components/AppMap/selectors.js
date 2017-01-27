// @flow

import {getRamalColor} from '../../selectors'

export const getEstacionMarkerOptions = ({google, preferences}: any, estacion: any) => {
  const isSelected = estacion.id === preferences.estacion.id
  return {
    position: estacion.position,
    zIndex: isSelected ? 9999 : 0,
    icon: new google.maps.MarkerImage(
      `/estacion${isSelected ? '-seleccionada' : ''}-marker.svg`,
      new google.maps.Size(15, 15),
      null,
      new google.maps.Point(7.5, 7.5)
    )
  }
}

export const getTrenMarkerOptions = ({google, preferences}: any, tren: any) => ({
  position: tren.position,
  icon: new google.maps.MarkerImage(
    `/tren-${getRamalColor(preferences.ramal, tren.ramal)}.svg`,
    null,
    null,
    new google.maps.Point(12, 12)
  )
})

export const getEstacionInfoWindowContent = ({preferences}: any, estacion: any) => {
  const isSelected = estacion.id === preferences.estacion.id
  return `
  <table style='margin-top: 5px'>
    <tbody>
        <tr>
        <td>
          <img alt='estacion' src='/estacion${isSelected ? '-seleccionada' : ''}-icon.svg' width='48px' />
        </td>
        <td style='vertical-align: middle'>
          <a style='font-size: 16px; font-weight: 400; color: #333; margin-left: 5px'>Estacion ${estacion.name}</a>
        </td>
        </tr>
    </tbody>
  </table>
`
}
