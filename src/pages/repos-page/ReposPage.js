import React from 'react'
import {withRouter} from 'react-router-dom'
import ReactTooltip from 'react-tooltip'
import _ from 'lodash'
import injectPropsAndState from '../../utils/decorators/injectPropsAndState'
import filterRepos from '../../utils/filterRepos'
import sortRepos from '../../utils/sortRepos'

import OwnerInfo from '../../components/OwnerInfo'
import ReposItem from '../../components/ReposItem'
import Navigation from '../../components/Navigation/Navigation'
import Button from '../../components/common/Button'

@withRouter
class ReposPage extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			showTip: true
		}

		this.checkIfShowTip = ::this.checkIfShowTip
		this.toHomePage = ::this.toHomePage
	}

	checkIfShowTip(event) {
	    const element = event.target
	    if (element.offsetWidth >= element.scrollWidth) {
	      	return this.setState({showTip: false})
	    } 
	    this.setState({showTip: true})
	}

	toHomePage() {
        const {history} = this.props
        history.push('/')
    }

	@injectPropsAndState
	render({ownerInfo, repos, links, currentRepo, sorting, filters, selectMoreRepos, setSortParam, setFilterParam, selectRepo}, {showTip}) {
		const languageList = _.chain(repos)
			.map(repo => repo.language)
			.uniq()
			.value()

		if (!repos.length) {
			return <div className="info">
				<p>Sorry, no repos.</p>
				<Button className="back" text="go back" onClick={this.toHomePage}/>
			</div>
		}

		if (filters) {
			repos = filterRepos(repos, filters)
			if (repos.length < 30 && (links && links.next)) {
				selectMoreRepos()
			}
		}

		if (sorting) {
			repos = sortRepos(repos, sorting)
		}

		let reposList = repos.map(repo => <ReposItem repo={repo} key={repo.id} selectRepo={selectRepo} />)

		return <div className="repos-page_content">
			<OwnerInfo info={ownerInfo} />
			<Navigation repos={repos} languageList={languageList} setSortParam={setSortParam} setFilterParam={setFilterParam} />
			<div className="repos_list">
				{reposList}
			</div>
			{(links && links.next) ? <small className="repos_show" onClick={() => selectMoreRepos()}>Show more</small> : null}
			<ReactTooltip type="info" className="tooltip" place="bottom" />
		</div>
	}
}

export default ReposPage
