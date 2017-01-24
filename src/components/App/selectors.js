type gmapsState = {
  library: ?any,
  error: boolean
}

export const gmapsLoaded = ({library, error}: gmapsState): boolean => !!library
export const gmapsFailed = ({error}: gmapsState): boolean => error
export const dataLoaded = ({trenesIsEmpty, horariosIsEmpty}) => (!trenesIsEmpty && !horariosIsEmpty)
export const dataFailed = ({trenesError, horariosError}) => (trenesError || horariosError)
