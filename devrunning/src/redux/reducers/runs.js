import { createReducer } from 'reduxsauce';
import { Types } from '../actionsCreators';

export const INITIAL_STATE = {
	isLoading: false,
	data: [],
	saved: false,
	isSaving: false
}

export function getRunsRequest(state = INITIAL_STATE) {
	return {
		...state,
		isLoading: true
	}
}

export function getRunsSuccess(state = INITIAL_STATE, action) {
	return {
		...state,
		isLoading: false,
		data: action.runs
	}
}

export function getRunsFailure(state = INITIAL_STATE) {
	return {
		...state,
		isLoading: false
	}
}

export function createRunsRequest(state = INITIAL_STATE) {
	return {
		...state,
		isSaving: true,
	}
}

export function createRunsSuccess(state = INITIAL_STATE, action) {
	return {
		...state,
		isSaving: false,
		saved: true
	}
}

export function createRunsFailure(state = INITIAL_STATE) {
	return {
		...state,
		isSaving: false,
		saved: false
	}
}

export function createRunsReset(state = INITIAL_STATE) {
	return {
		...state,
		isSaving: false,
		saved: false
	}
}

export function removeRunsRequest(state = INITIAL_STATE) {
	return {
		...state,
		isSaving: true
	}
}

export function removeRunsSuccess(state = INITIAL_STATE, action) {
	const runs = state.data;
	const id = action.id;
	const indexToDelete = runs.findIndex(run => run.id);
	runs.splice(indexToDelete, 1);

	return {
		...state,
		isSaving: false
	}
}

export function removeRunsFailure(state = INITIAL_STATE) {
	return {
		...state,
		isSaving: false
	}
}

export const HANDLERS = {
	[Types.GET_RUNS_REQUEST]: getRunsRequest,
	[Types.GET_RUNS_SUCCESS]: getRunsSuccess,
	[Types.GET_RUNS_FAILURE]: getRunsFailure,

	[Types.CREATE_RUNS_REQUEST]: createRunsRequest,
	[Types.CREATE_RUNS_SUCCESS]: createRunsSuccess,
	[Types.CREATE_RUNS_FAILURE]: createRunsFailure,
	[Types.CREATE_RUNS_RESET]: createRunsReset,

	[Types.REMOVE_RUNS_REQUEST]: removeRunsRequest,
	[Types.REMOVE_RUNS_SUCCESS]: removeRunsSuccess,
	[Types.REMOVE_RUNS_FAILURE]: removeRunsFailure
}

export default createReducer(INITIAL_STATE, HANDLERS);
