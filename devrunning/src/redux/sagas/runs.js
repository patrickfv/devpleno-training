import axios from 'axios';
import ActionCreators from '../actionsCreators';
import { call, put } from 'redux-saga/effects';

export const getRuns = ({ api }) => function* (action) {

	const token = localStorage.getItem('token');
	let filter = '';
	if(action.admin) {
		filter = '?admin=true';
	}
	const runs = yield call(api.getRuns, filter);
	yield put(ActionCreators.getRunsSuccess(runs.data.data));
}

export const createRuns = ({ api }) => function* (action) {
	const runs = yield call(api.createRun, action.run);
	yield put(ActionCreators.createRunsSuccess(runs.data));
}

export const removeRuns = ({ api }) => function* (action) {
	yield call(api.removeRun, action.id);
	yield put(ActionCreators.removeRunsSuccess(action.id));
}
