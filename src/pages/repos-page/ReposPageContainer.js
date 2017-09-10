import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import injectPropsAndState from '../../utils/decorators/injectPropsAndState'
import {getNextRepos, getOwnerRepo} from '../../reducers-and-actions/ownerReposActions'

import ReposPage from './ReposPage'
import Loader from '../../components/common/Loader'
import RepoDialog from '../../components/RepoDialog/RepoDialog'

const mapStateToProps = (store) => {
    return {
        isFetching: store.ownerRepos.isFetching,
        ownerInfo: store.ownerRepos.ownerInfo,
    	error: store.ownerRepos.error,
        repos: store.ownerRepos.repos,
        links: store.ownerRepos.links,
        currentRepo: store.ownerRepos.currentRepo
    }
}

@withRouter
@connect(mapStateToProps, {getNextRepos, getOwnerRepo})
class ReposPageContainer extends Component {	
	constructor(props) {
		super(props);
		this.state = {
			showRepoDialog: false,
			sorting: null,
			filters: null
		}

		this.selectMoreRepos = ::this.selectMoreRepos
		this.setSortParam = ::this.setSortParam
		this.setFilterParam = ::this.setFilterParam
		this.selectRepo = ::this.selectRepo
		this.closeRepoDialog = ::this.closeRepoDialog
	}

	componentWillReceiveProps(newProps) {
		if (newProps.currentRepo) {
			this.setState({showRepoDialog: true})
		}
	}

	selectMoreRepos() {
		const {getNextRepos, links} = this.props
		getNextRepos(links.next)
	}

	setSortParam(params) {
    	this.setState({sorting: params})
    }

    setFilterParam(params) {
    	localStorage.setItem('filters', JSON.stringify(params))
    	this.setState({filters: params})
    }

	selectRepo(repo) {
		this.props.getOwnerRepo(repo)
	}

	closeRepoDialog() {
		this.setState({showRepoDialog: false})
	}

	@injectPropsAndState
	render({isFetching, ownerInfo, repos, links, currentRepo}, {showRepoDialog, sorting, filters}) {
		if (isFetching) {
			return <div className="repos-page">
				<Loader />
			</div>
		}

		let repoDialog = null
		if (showRepoDialog) {
			repoDialog = <div className="repo">
				<RepoDialog repo={currentRepo} closeRepoDialog={this.closeRepoDialog} />
			</div>
		}

		return <div className="repos-page">
            <ReposPage
            	ownerInfo={ownerInfo}
            	repos={repos}
            	links={links}
            	sorting={sorting}
            	filters={filters}
            	currentRepo={currentRepo}
            	selectMoreRepos={this.selectMoreRepos}
            	setSortParam={this.setSortParam}
            	setFilterParam={this.setFilterParam}
            	selectRepo={this.selectRepo}/>
            {repoDialog}
		</div>
	}
}

export default ReposPageContainer