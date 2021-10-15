import jwtDecode from 'jwt-decode';
import { call, put } from 'redux-saga/effects';

import ActionCreators from '../actionsCreators';

export const login = ({ api }) => function* (action) {
  const { email, passwd } = action;
  const login = yield call(api.login, { email, passwd });
  let token = '';
  if (login.data.token) {
    token = login.data.token;
    const user = jwtDecode(token);

    localStorage.setItem('token', token);
    localStorage.setItem('user', user);

    yield put(ActionCreators.signinSuccess(user));
  } else {
    yield put(ActionCreators.signinFailure(login.data.message));
  }
}

export const auth = ({ api }) => function* () {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const user = yield call(api.getUser, 'me');
      yield put(ActionCreators.authSuccess(user.data));
    } catch (err) {
      yield put(ActionCreators.authFailure('invalid token'));
    }
  } else {
    yield put(ActionCreators.authFailure('no token'));
  }
}

export const updateProfile = ({ api }) => function* (action) {
  try {
    const userToSave = {
      ...action.user
    }
    yield call(api.updateUser, userToSave);
    yield put(ActionCreators.updateProfileSuccess(userToSave));
  } catch(err) {
    yield put(ActionCreators.updateProfileFailure('error'));
  }
  
}

export const createProfile = ({ api }) => function* (action) {
  const userToSave =  {
    ...action.user
  }
  const user = yield call(api.createUser, userToSave);
  if(user && user.data && user.data.error) {
    yield put(ActionCreators.createProfileFailure(user.data.message));
  } else {
    yield put(ActionCreators.createProfileSuccess(userToSave));
    yield put(ActionCreators.signinRequest(userToSave.email, userToSave.passwd));
  }
}

export function* destroyAuth() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  yield put(ActionCreators.destroyAuthSuccess());
}