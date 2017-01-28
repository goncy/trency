// @flow

import type {gmapsState} from './index'

export const gmapsLoaded = ({library, error}: gmapsState): boolean => !!library
export const gmapsFailed = ({error}: gmapsState): boolean => error
