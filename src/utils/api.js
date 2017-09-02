import axios from 'axios'

import { USERS_URL, ORGS_URL, REPOS_URL } from '../constants/url'

export function receiveUserRepos({owner: username}) {
	return axios.get(`${USERS_URL}/${username}/repos`)
		.then(response => ({repos: response.data, links: response.headers.link || null}))
		.catch(() => {})
}

export function receiveOrgRepos({owner: org}) {
	return axios.get(`${ORGS_URL}/${org}/repos`)
		.then(response => ({repos: response.data, links: response.headers.link || null}))
		.catch(() => {})
}

export function receiveOwnerInfo({owner}) {
	return axios.get(`${USERS_URL}/${owner}`)
		.then(response => response.data)
}

export function receiveNextRepos(url) {
	return axios.get(url)
		.then(response => ({repos: response.data, links: response.headers.link || null}))
		.catch(() => {})
}

export function receiveOwnerRepo({owner, name}) {
	return axios.get(`${REPOS_URL}/${owner.login}/${name}`)
		.then(response => response.data)
		.catch(() => {})
}

export function receiveRepoContrs({owner, name}) {
	return axios.get(`${REPOS_URL}/${owner.login}/${name}/contributors`)
		.then(response => response.data)
		.catch(() => {})
}

export function receiveRepoLangs({owner, name}) {
	return axios.get(`${REPOS_URL}/${owner.login}/${name}/languages`)
		.then(response => response.data)
		.catch(() => {})
}

export function receiveRepoPulls({owner, name}) {
	return axios.get(`${REPOS_URL}/${owner.login}/${name}/pulls`)
		.then(response => response.data)
		.catch(() => {})
}
