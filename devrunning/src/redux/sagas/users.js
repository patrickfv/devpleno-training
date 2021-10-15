import axios from 'axios';
import ActionCreators from '../actionsCreators';
import { put, call } from 'redux-saga/effects';

export const getUser = ({ api }) => function*(action) {
	const user = yield call(api.getUser, action.id);
	yield put(ActionCreators.getUserSuccess(user.data));
}

export const getUsers = ({ api }) => function* (action) {
	const users = yield call(api.getUsers);
	yield put(ActionCreators.getUsersSuccess(users.data));
}

export const updateUser = ({ api }) => function* (action) {
	try {
		yield call(api.updateUser, action.user);
    yield put(ActionCreators.updateUserSuccess(action.user));
  } catch(err) {
    yield put(ActionCreators.updateUserFailure(err));
  }
}

export const removeUsers = ({ api }) => function* (action) {
	yield call(api.removeUsers, action.id);
	yield put(ActionCreators.removeUsersSuccess(action.id));
}
