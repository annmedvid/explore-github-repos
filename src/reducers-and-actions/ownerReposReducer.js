import {createReducer} from 'redux-create'

import {
    FETCHING_START,
    OWNER_REPOS_SUCCESS,
    OWNER_REPOS_FAILED,
    NEXT_REPOS_SUCCESS,
    NEXT_REPOS_FAILED,
    OWNER_REPO_SUCCESS, 
    OWNER_REPO_FAILED
} from '../constants/actions'

import parseLinkHeader from '../utils/parseLinkHeader'
import repoDestruct from '../utils/reposDestruct'

const INITIAL_STATE = {
    isFetching: false,
    error: false,
    ownerInfo: null,
    repos: [],
    links: null,
    currentRepo: null
}

const reducerMap = {
    [FETCHING_START]: (state) => ({
        ...state,
        currentRepo: null,
        isFetching: true
    }),
    [OWNER_REPOS_SUCCESS]: (state, data) => {
        const {reposInfo, ownerInfo} = data
        const {repos, links} = reposInfo
        const parsedLinks = parseLinkHeader(links)
        localStorage.removeItem('filters')

        return {
            ...INITIAL_STATE,
            ownerInfo,
            repos,
            links: parsedLinks
        }
    },
    [OWNER_REPOS_FAILED]: (state) => ({
        ...INITIAL_STATE,
        error: true
    }),
    [NEXT_REPOS_SUCCESS]: (state, data) => {
        const {ownerInfo} = state
        const {repos, links} = data
        const parsedLinks = parseLinkHeader(links)

        return {
            ...INITIAL_STATE,
            ownerInfo,
            repos: [...state.repos, ...repos],
            links: parsedLinks
        }
    },
    [NEXT_REPOS_FAILED]: (state) => ({
        ...state,
        error: true
    }),
    [OWNER_REPO_SUCCESS]: (state, repo) => {
        const currentRepo = repoDestruct(repo)

        return {
            ...state,
            isFetching: false,
            error: false,
            currentRepo
        }
    }, 
    [OWNER_REPO_FAILED]: (state) => ({
        ...state,
        isFetching: false,
        error: true,
        currentRepo: null
    })
}

export default createReducer(INITIAL_STATE, reducerMap)
