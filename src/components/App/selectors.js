type gmapsState = {
  loaded: boolean,
  error: boolean
}

export const gmapsLoaded = ({loaded, error}: gmapsState): boolean => loaded
export const gmapsFailed = ({loaded, error}: gmapsState): boolean => error
export const dataLoaded = ({trenesIsEmpty, horariosIsEmpty}) => (!trenesIsEmpty && !horariosIsEmpty)
export const dataFailed = ({trenesError, horariosError}) => (trenesError || horariosError)
