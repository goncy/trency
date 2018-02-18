import { select, take, put, takeEvery } from "redux-saga/effects";

import {
  changeStation,
  changeLine,
  changeBranch,
  clearPreferences,
  preferencesReady,
  preferencesChanged,
  preferencesNoMatch
} from "../actions/preferences";
import { preferencesSet } from "../selectors/preferences";
import { getLine, getBranch, getStation } from "../selectors/constants";

function* lineChangedWorker({ payload }) {
  const line = getLine(payload);
  if (line) {
    return yield put(changeLine.success(line));
  } else {
    return yield put(preferencesNoMatch.run());
  }
}

function* branchChangedWorker({ payload }) {
  const { preferences } = yield select();
  const { line } = preferences;
  const branch = getBranch(line, payload);
  if (branch) {
    return yield put(changeBranch.success(branch));
  } else {
    return yield put(preferencesNoMatch.run());
  }
}

function* stationChangedWorker({ payload }) {
  const { preferences } = yield select();
  const { branch } = preferences;
  const station = getStation(branch, payload);
  if (station) {
    return yield put(changeStation.success(station));
  } else {
    return yield put(preferencesNoMatch.run());
  }
}

function* preferencesChangedWatcher() {
  const changeActions = take([
    changeStation.SUCCESS,
    changeLine.SUCCESS,
    changeBranch.SUCCESS,
    clearPreferences.type
  ]);
  while (yield changeActions) {
    yield put(preferencesChanged.run());
    const { preferences } = yield select();
    if (preferencesSet(preferences)) {
      yield put(preferencesReady.run());
    }
  }
}

function* redirectToHomeWatcher() {
  while (yield take(preferencesNoMatch.type)) {
    window.location.replace("/");
  }
}

function* lineChangedWatcher() {
  yield takeEvery(changeLine.type, lineChangedWorker);
}

function* branchChangedWatcher() {
  yield takeEvery(changeBranch.type, branchChangedWorker);
}

function* stationChangedWatcher() {
  yield takeEvery(changeStation.type, stationChangedWorker);
}

export default [
  preferencesChangedWatcher,
  lineChangedWatcher,
  branchChangedWatcher,
  stationChangedWatcher,
  redirectToHomeWatcher
];
