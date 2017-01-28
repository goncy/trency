export const getArrival = arrival => {
  const minutos = Number(arrival)
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

export const getBranch = ({branch, arrival}, index) => ({
  color: branch.directions[index].color,
  destino: branch.directions[index].name,
  arrivals: {
    primero: getArrival(arrival.arrivals[index].primero),
    segundo: getArrival(arrival.arrivals[index].segundo)
  }
})

export const getBranches = props => props.branch.directions.map((destino, index) => getBranch(props, index))
