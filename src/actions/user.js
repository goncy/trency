import * as types from "../types";
import { makeAction } from "../utils/makeActionCreator";

export const idleChanged = makeAction(types.IDLE_CHANGED);
