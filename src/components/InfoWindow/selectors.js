export const getInfoWindow = ({google, marker, isSelected}) => new google.maps.InfoWindow({
  content: `<table style='margin-top: 5px'>
    <tbody>
        <tr>
        <td>
          <img alt='estacion' src='/estacion${isSelected ? '-seleccionada' : ''}-icon.svg' width='48px'>
        </td>
        <td style='vertical-align: middle'>
          <a style='font-size: 16px; font-weight: 400; color: #333; margin-left: 5px'>Estación ${marker.name}</a>
        </td>
        </tr>
    </tbody>
  </table>`
})
