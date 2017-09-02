import _ from 'lodash'

const sortingTypes = {
	byName: 'name',
	byStars: 'stargazers_count',
	byIssues: 'open_issues_count',
	byUpdated: 'updated_at'
}

function sortRepos(repos, sorting) {
	const param = sortingTypes[sorting.param]
	const order = sorting.order ? 'desc' : 'asc'

	return _.orderBy(repos, param, order)
}

export default sortRepos
