// @flow
import { List } from "immutable";

import type { Arrival } from "../../flowtypes/data";
import type { Branch, Station } from "../../flowtypes/constants";
import type { ArrivalsProps } from "./index";

export const getArrivalTime = (arrival: string) => {
  const minutos = Number(arrival);
  if (minutos < 0) {
    return "-";
  } else if (minutos === 0) {
    return "En anden";
  } else if (minutos === 1) {
    return "1 minuto";
  } else if (minutos > 1) {
    return `${minutos} minutos`;
  }
};

export const getActiveArrivals = (
  arrivals: List<Arrival>,
  branch: Branch,
  station: Station
): Arrival => arrivals.get(station.index);

export const getBranch = (
  { branch, station, arrivals }: ArrivalsProps,
  index: number
) => {
  const activeArrival = getActiveArrivals(arrivals, branch, station);
  return {
    color: branch.directions[index].color,
    destino: branch.directions[index].name,
    arrivals: {
      primero: getArrivalTime(activeArrival.arrivals[index].primero),
      segundo: getArrivalTime(activeArrival.arrivals[index].segundo)
    }
  };
};

export const getBranches = (props: ArrivalsProps) =>
  props.branch.directions.map((destino, index) => getBranch(props, index));
