// @flow

type asyncAction = {
  type: string,
  start: (payload: ?any) => { type: string, payload: any },
  success: (payload: ?any) => { type: string, payload: any },
  failure: (payload: ?any) => { type: string, payload: any },
  START: string,
  SUCCESS: string,
  FAILURE: string
}

export const makeAction = (type: string): asyncAction => ({
  type,
  run: payload => ({ type, payload }),
  start: payload => ({ type: `${type}_START`, payload }),
  success: payload => ({ type: `${type}_SUCCESS`, payload }),
  failure: payload => ({ type: `${type}_FAILURE`, payload }),
  START: `${type}_START`,
  SUCCESS: `${type}_SUCCESS`,
  FAILURE: `${type}_FAILURE`
})
