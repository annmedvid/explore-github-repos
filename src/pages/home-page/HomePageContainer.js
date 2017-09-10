import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getOwnerRepos} from '../../reducers-and-actions/ownerReposActions'
import injectState from '../../utils/decorators/injectState'

import HomePage from './HomePage'
import Loader from '../../components/common/Loader'

const mapStateToProps = (store) => {
    return {
        isFetching: store.ownerRepos.isFetching,
        error: store.ownerRepos.error,
        repos: store.ownerRepos.repos
    }
}

@withRouter
@connect(mapStateToProps, {getOwnerRepos})
class HomePageContainer extends Component {

	constructor(props) {
        super(props);
        this.state = {
            credentials: {
                owner: ""
            },
            showWarning: false
        }

        this.onChangeInput = ::this.onChangeInput
        this.onSearchOwner = ::this.onSearchOwner
    }

    componentWillReceiveProps(newProps) {
        const {history, repos} = this.props      
        if (repos) history.push('/kottans')
        this.setState({showWarning: newProps.error})
    }

    onChangeInput(e) {
        const input = e.target
        const {credentials} = this.state
        credentials[input.name] = input.value
        this.setState({credentials: credentials, showWarning: false})
    }

    onSearchOwner(e) {
        e.preventDefault()
        const {credentials} = this.state
        const {getOwnerRepos} = this.props
        if (credentials.owner) getOwnerRepos(credentials)
    }

	@injectState
  	render({isFetching, showWarning}) {
        if (isFetching) {
            return <Loader />
        }

    	return <div className="home-page">
    		<HomePage 
                showWarning={showWarning}
                onChangeInput={this.onChangeInput}
                onSearchOwner={this.onSearchOwner} />
    	</div>
  	}
}

export default HomePageContainer
