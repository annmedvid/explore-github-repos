import {call, put, takeEvery, all, fork} from 'redux-saga/effects'

import {
    OWNER_REPOS_REQUEST,
    NEXT_REPOS_REQUEST,
    OWNER_REPO_REQUEST
} from './constants/actions'
import {
    startFetching,
    getOwnerReposSuccess,
    getOwnerReposFailed,
    getNextReposSuccess,
    getNextReposFailed,
    getOwnerRepoSuccess,
    getOwnerRepoFailed
} from './reducers-and-actions/ownerReposActions'
import {
    receiveUserRepos,
    receiveOrgRepos,
    receiveOwnerInfo,
    receiveNextRepos,
    receiveOwnerRepo,
    receiveRepoContrs,
    receiveRepoLangs,
    receiveRepoPulls
} from './utils/api'

function* watchGetOwnerRepos() {
    yield takeEvery(OWNER_REPOS_REQUEST, fetchOwnerRepos)
}

function* fetchOwnerRepos(action) {
    try {
        yield put(startFetching())

        const [userRepos = null, orgRepos = null, ownerInfo]  = yield all([
            call(receiveUserRepos, action.payload),
            call(receiveOrgRepos, action.payload),
            call(receiveOwnerInfo, action.payload)
        ])

        const reposInfo = userRepos || orgRepos

        if (reposInfo) {
            yield put(getOwnerReposSuccess({reposInfo, ownerInfo}))
        } else {
            yield put(getOwnerReposFailed({ownerInfo}))
        }
    } catch (e) {
        yield put(getOwnerReposFailed())
    }
}

function* watchGetNextRepos() {
    yield takeEvery(NEXT_REPOS_REQUEST, fetchNextRepos)
}

function* fetchNextRepos(action) {
    try {
        yield put(startFetching())

        const data  = yield call(receiveNextRepos, action.payload)

        yield put(getNextReposSuccess(data))
    } catch (e) {
        yield put(getNextReposFailed())
    }
}

function* watchGetOwnerRepo() {
    yield takeEvery(OWNER_REPO_REQUEST, fetchOwnerRepo)
}

function* fetchOwnerRepo(action) {
    try {
        yield put(startFetching())

        const [repo, contributors = null, languages = null, pulls = null]  = yield all([
            call(receiveOwnerRepo, action.payload),
            call(receiveRepoContrs, action.payload),
            call(receiveRepoLangs, action.payload),
            call(receiveRepoPulls, action.payload)
        ])

        console.log(repo)

        yield put(getOwnerRepoSuccess({repo, contributors, languages, pulls}))
    } catch (e) {
        yield put(getOwnerRepoFailed())
    }
}

export default function* rootSaga() {
  	yield all([
    	fork(watchGetOwnerRepos),
        fork(watchGetNextRepos),
        fork(watchGetOwnerRepo)
  	])
}
