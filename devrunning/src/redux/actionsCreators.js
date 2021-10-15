import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
	signinRequest: ['email', 'passwd'],
	signinSuccess: ['user'],
	signinFailure: ['error'],

	authRequest: null,
	authSuccess: ['user'],
	authFailure: null,

	destroyAuthRequest: null,
	destroyAuthSuccess: null,

	getRunsRequest: ['admin'],
	getRunsSuccess: ['runs'],
	getRunsFailure: null,

	getUsersRequest: null,
	getUsersSuccess: ['users'],
	getUsersFailure: null,

	getUserRequest: ['id'],
	getUserSuccess: ['user'],
	getUserFailure: null,

	createRunsRequest: ['run'],
	createRunsSuccess: ['run'],
	createRunsFailure: ['error'],
	createRunsReset: null,

	removeRunsRequest: ['id'],
	removeRunsSuccess: ['id'],
	removeRunsFailure: ['error'],

	removeUsersRequest: ['id'],
	removeUsersSuccess: ['id'],
	removeUsersFailure: ['error'],

	updateProfileReset: null,
	updateProfileRequest: ['user'],
	updateProfileSuccess: ['user'],
	updateProfileFailure: ['error'],

	updateUserReset: null,
	updateUserRequest: ['user'],
	updateUserSuccess: ['user'],
	updateUserFailure: ['error'],

	createProfileReset: null,
	createProfileRequest: ['user'],
	createProfileSuccess: ['user'],
	createProfileFailure: ['error'],
});

export default Creators;
