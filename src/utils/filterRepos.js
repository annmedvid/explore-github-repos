import _ from 'lodash'

const params = {
	hasIssues: 'open_issues_count',
	hasTopics: 'topics',
	hasStars: 'stargazers_count',
	updatedAfter: 'updated_at',
	hasTypeFork: 'fork',
	particularLang: 'language'
}

const filterMap = {
    hasIssues: (repos, value, key) => {
        return _.filter(repos, repo => repo[params[key]] > 0)
    },
    hasTopics: (repos, value, key) => {
        return _.filter(repos, repo => repo[params[key]].length)
    },
    hasStars: (repos, value, key) => {
        return _.filter(repos, repo => repo[params[key]] >= value)
    },
    updatedAfter: (repos, value, key) => {
        return _.filter(repos, (repo) => new Date(repo[params[key]]) >= new Date(value))
    },
    type: (repos, value, key) => {
        if (value['hasTypeFork']) {
        	return _.filter(repos, params['hasTypeFork'])
        }
        return repos
    },
    particularLang: (repos, value, key) => {
        if (value === 'not defined') {
            return _.filter(repos, [params[key], null])
        }
        if (value === 'all') return repos
		return _.filter(repos, [params[key], value])
    }
}

function filterRepos(repos, filters) {
	_.forIn(filters, (value, key) => {
		const filter = filterMap[key]
		if (value) {
			repos = filter(repos, value, key)
		}
	})

	return repos
}

export default filterRepos
