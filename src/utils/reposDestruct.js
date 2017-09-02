function repoDestruct({repo, contributors, languages, pulls}) {
	const {
		owner, id, name, description, homepage, language, private: isPrivate, forks_count: forksAmount,
		stargazers_count: startsAmount, watchers_count: watchersAmount, created_at: created, updated_at: updated,
		parent = null, html_url: url
	} = repo

	return {
		owner: owner.login,
		forked_from: parent,
		id,
		name,
		description,
		homepage,
		language,
		isPrivate,
		forksAmount,
		startsAmount,
		watchersAmount,
		created,
		updated,
		url,
		contributors,
		languages,
		pulls
	}
}

export default repoDestruct
