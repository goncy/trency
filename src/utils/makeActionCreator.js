//@flow

type asyncAction = {
  type: string,
  start: (payload: ?any) => {type: string, payload: any},
  success: (payload: ?any) => {type: string, payload: any},
  failure: (payload: ?any) => {type: string, payload: any}
}

export const makeAsyncAction = (type: string): asyncAction => ({
  type,
  run: payload => ({type, payload}),
  start: payload => ({type: `${type}_START`, payload}),
  success: payload => ({type: `${type}_SUCCESS`, payload}),
  failure: payload => ({type: `${type}_FAILURE`, payload}),
  START: `${type}_START`,
  SUCCESS: `${type}_SUCCESS`,
  FAILURE: `${type}_FAILURE`
})

export const makeAction = (type: string, payload: any, ...rest: any) => ({type, payload, ...rest})
