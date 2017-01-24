export const getHorario = horario => {
  const minutos = Number(horario)
  if (minutos < 0) {
    return '-'
  } else if (minutos === 0) {
    return 'En anden'
  } else if (minutos === 1) {
    return '1 minuto'
  } else if (minutos > 1) {
    return `${minutos} minutos`
  }
}

export const getRamal = ({ramal, horario}, index) => ({
  color: ramal.destinos[index].color,
  destino: ramal.destinos[index].name,
  horarios: {
    primero: getHorario(horario.horarios[index].primero),
    segundo: getHorario(horario.horarios[index].segundo)
  }
})

export const getRamales = props => props.ramal.destinos.map((destino, index) => getRamal(props, index))
