import { createReducer } from 'reduxsauce';
import { Types } from '../actionsCreators';

export const INITIAL_STATE = {
	isLoading: true,
	data: [],
	saved: false,
	isSaving: false,
	user: {}
}

export function getUsersRequest(state = INITIAL_STATE) {
	return {
		...state,
		isLoading: true
	}
}

export function getUsersSuccess(state = INITIAL_STATE, action) {
	return {
		...state,
		isLoading: false,
		data: action.users
	}
}

export function getUsersFailure(state = INITIAL_STATE) {
	return {
		...state,
		isLoading: false
	}
}

export function getUserRequest(state = INITIAL_STATE) {
	return {
		...state,
		isLoading: true
	}
}

export function getUserSuccess(state = INITIAL_STATE, action) {
	return {
		...state,
		isLoading: false,
		user: action.user
	}
}

export function getUserFailure(state = INITIAL_STATE) {
	return {
		...state,
		isLoading: false
	}
}

export function removeUsersRequest(state = INITIAL_STATE) {
	return {
		...state,
		isSaving: true
	}
}

export function removeUsersSuccess(state = INITIAL_STATE, action) {
	const runs = state.data;
	const id = action.id;
	const indexToDelete = runs.findIndex(run => run.id);
	runs.splice(indexToDelete, 1);

	return {
		...state,
		isSaving: false
	}
}

export function removeUsersFailure(state = INITIAL_STATE) {
	return {
		...state,
		isSaving: false
	}
}

export const updateUserRequest = (state = INITIAL_STATE, action) => {
	return {
		...state,
		isSaving: true,
		error: false,
		errorMessage: '',
		saved: false
	}
}

export const updateUserSuccess = (state = INITIAL_STATE, action) => {
	return {
		...state,
		isSaving: false,
		user: action.user,
		saved: true
	}
}

export const updateUserFailure = (state = INITIAL_STATE, action) => {
	return {
		...state,
		isSaving: false,
		error: true,
		errorMessage: action.error,
		saved: false
	}
}

export const updateUserReset = (state = INITIAL_STATE, action) => {
	return {
		...state,
		isSaving: false,
		saved: false
	}
}


export const HANDLERS = {
	[Types.GET_USERS_REQUEST]: getUsersRequest,
	[Types.GET_USERS_SUCCESS]: getUsersSuccess,
	[Types.GET_USERS_FAILURE]: getUsersFailure,

	[Types.GET_USER_REQUEST]: getUserRequest,
	[Types.GET_USER_SUCCESS]: getUserSuccess,
	[Types.GET_USER_FAILURE]: getUserFailure,

	[Types.UPDATE_USER_REQUEST]: updateUserRequest,
	[Types.UPDATE_USER_SUCCESS]: updateUserSuccess,
	[Types.UPDATE_USER_FAILURE]: updateUserFailure,
	[Types.UPDATE_USER_RESET]: updateUserReset,

	[Types.REMOVE_USERS_REQUEST]: removeUsersRequest,
	[Types.REMOVE_USERS_SUCCESS]: removeUsersSuccess,
	[Types.REMOVE_USERS_FAILURE]: removeUsersFailure
}

export default createReducer(INITIAL_STATE, HANDLERS);
