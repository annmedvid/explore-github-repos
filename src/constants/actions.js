import {createActionType} from 'redux-create'

const FETCHING = 'FETCHING'
const OWNER = 'OWNER'
const NEXT = 'NEXT'
const REPOS = 'REPOS'
const REPO = 'REPO'

const REQUEST = 'REQUEST'
const START = 'START'
const SUCCESS = 'SUCCESS'
const FAILED = 'FAILED'

export const FETCHING_START = createActionType(FETCHING, START)

export const OWNER_REPOS_REQUEST = createActionType(OWNER, REPOS, REQUEST)
export const OWNER_REPOS_SUCCESS = createActionType(OWNER, REPOS, SUCCESS)
export const OWNER_REPOS_FAILED = createActionType(OWNER, REPOS, FAILED)

export const NEXT_REPOS_REQUEST = createActionType(NEXT, REPOS, REQUEST)
export const NEXT_REPOS_SUCCESS = createActionType(NEXT, REPOS, SUCCESS)
export const NEXT_REPOS_FAILED = createActionType(NEXT, REPOS, FAILED)

export const OWNER_REPO_REQUEST = createActionType(OWNER, REPO, REQUEST)
export const OWNER_REPO_SUCCESS = createActionType(OWNER, REPO, SUCCESS)
export const OWNER_REPO_FAILED = createActionType(OWNER, REPO, FAILED)
