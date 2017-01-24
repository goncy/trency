/* global google */

import {MAP_DEFAULT_OPTIONS} from './constants'

export const getOptions = ({mapOpts}) => ({
  ...MAP_DEFAULT_OPTIONS,
  ...mapOpts
})

export const getPath = ramal => google.maps.geometry.encoding.decodePath(decodeURI(ramal.path))

export const getEstaciones = ramal => ramal.estaciones

export const buildEstaciones = (ramal, estacion, map) => {
  return ramal.estaciones
    .map((est, index) => {
      const isSelected = est.id === estacion.id
      const marker = new google.maps.Marker({
        map,
        zIndex: isSelected ? 9999 : -1,
        position: est.posicion,
        icon: new google.maps.MarkerImage(
          `/estacion${isSelected ? '-seleccionada' : ''}-marker.svg`,
          new google.maps.Size(15, 15),
          null,
          new google.maps.Point(7.5, 7.5)
        )
      })

      const infoWindow = new google.maps.InfoWindow({content: `<table style='margin-top: 5px'>
        <tbody>
          <tr>
            <td>
              <img alt='estacion' src='/estacion${isSelected ? '-seleccionada' : ''}-icon.svg' width='48px'>
            </td>
            <td style='vertical-align: middle'>
              <a style='font-size: 16px; font-weight: 400; color: #333; margin-left: 5px'>Estación ${est.name}</a>
            </td>
          </tr>
        </tbody>
      </table>`})

      google.maps.event.addListener(marker, 'click', () => infoWindow.open(map, marker))

      return {
        marker,
        infoWindow
      }
    })
}
