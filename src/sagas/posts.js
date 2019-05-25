/**
 * @module Sagas/GitHub
 * @desc GitHub
 */

import { all, call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'modules/client';

import { ActionTypes } from 'constants/index';

/**
 * Get Repos
 *
 * @param {Object} action
 *
 */
export function* getAllUsers({  }) {
  try {
    const response = yield call(
      request,
      `https://jsonplaceholder.typicode.com/users`,
    );
    console.log(response,"hereeee")
    yield put({
      type: ActionTypes.GET_USERS_SUCCESS,
      payload: { data: response },
    });
  } catch (err) {
    /* istanbul ignore next */
   }
}
export function* getAllPosts({  }) {
  try {
    const response = yield call(
      request,
      `https://api.github.com/search/repositories?q=${payload.query}&sort=stars`,
    );
    yield put({
      type: ActionTypes.GET_POSTS_SUCCESS,
      payload: { data: response.items },
    });
  } catch (err) {
    /* istanbul ignore next */
   }
}

/**
 * GitHub Sagas
 */
export default function* root() {
  yield takeLatest(ActionTypes.GET_ALL_USERS, getAllUsers);
 // yield takeLatest(ActionTypes.GET_ALL_POSTS, getAllPosts);
//  yield takeLatest(ActionTypes.GET_COMMENTS, getAllUsers);
}
