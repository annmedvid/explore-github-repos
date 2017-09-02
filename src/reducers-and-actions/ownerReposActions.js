import {createActionCreator} from 'redux-create'

import {
	FETCHING_START,
	OWNER_REPOS_REQUEST,
	OWNER_REPOS_SUCCESS,
	OWNER_REPOS_FAILED,
	NEXT_REPOS_REQUEST,
	NEXT_REPOS_SUCCESS,
	NEXT_REPOS_FAILED,
	OWNER_REPO_REQUEST,
	OWNER_REPO_SUCCESS, 
	OWNER_REPO_FAILED
} from '../constants/actions'

export const startFetching = createActionCreator(FETCHING_START)

export const getOwnerRepos = createActionCreator(OWNER_REPOS_REQUEST)

export const getOwnerReposSuccess = createActionCreator(OWNER_REPOS_SUCCESS)

export const getOwnerReposFailed = createActionCreator(OWNER_REPOS_FAILED)

export const getNextRepos = createActionCreator(NEXT_REPOS_REQUEST)

export const getNextReposSuccess = createActionCreator(NEXT_REPOS_SUCCESS)

export const getNextReposFailed = createActionCreator(NEXT_REPOS_FAILED)

export const getOwnerRepo = createActionCreator(OWNER_REPO_REQUEST)

export const getOwnerRepoSuccess = createActionCreator(OWNER_REPO_SUCCESS)

export const getOwnerRepoFailed = createActionCreator(OWNER_REPO_FAILED)
