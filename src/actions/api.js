import * as types from "../types";
import { makeAction } from "../utils/makeActionCreator";

export const fetchData = makeAction(types.FETCH_DATA);
export const clearData = makeAction(types.CLEAR_DATA);
export const stopFetch = makeAction(types.STOP_FETCH);
export const startFetch = makeAction(types.START_FETCH);
