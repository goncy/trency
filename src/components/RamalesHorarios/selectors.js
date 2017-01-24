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
