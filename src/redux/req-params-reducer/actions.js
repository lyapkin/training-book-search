import {SAVE_REQ_PARAMS} from './actionTypes'

export const saveReqParams = (params) => {
	return {
		type: SAVE_REQ_PARAMS,
		payload: params
	}
}