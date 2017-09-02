import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import injectPropsAndState from '../../utils/decorators/injectPropsAndState'

import Filters from './Filters'
import Sorting from './Sorting'
import Button from '../common/Button'
import Icon from '../common/Icon'

@withRouter
class Navigation extends Component {
	constructor(props) {
    	super(props)
    	this.state = {
    		showFilters: false,
    		showSorting: false
    	}

        this.toHomePage = ::this.toHomePage
        this.changeView = ::this.changeView
  	}

    toHomePage() {
        const {history} = this.props
        history.push('/')
    }

    changeView(option) {
    	const state = this.state
    	state[option] = !this.state[option]
    	this.setState(state)
    }

	@injectPropsAndState
	render({repos, languageList, setFilterParam, setSortParam}, {showFilters, showSorting}) {
		return <aside className="navigation">	
			<div className="navigation-group">
				<h3 className="navigation-title">filters</h3>
				<span onClick={() => this.changeView('showFilters')}><Icon type="next" className="icon" /></span>
				{showFilters ? <Filters repos={repos} languageList={languageList} setFilterParam={setFilterParam} /> : null}
			</div>
			<div className="navigation-group">
				<h3 className="navigation-title">sorting</h3>
				<span onClick={() => this.changeView('showSorting')}><Icon type="next" className="icon"/></span>
				{showSorting ? <Sorting setSortParam={setSortParam} /> : null}
			</div>
	   		<Button className="navigation-back" text="go back" onClick={this.toHomePage}/>
		</aside>
	}
}

export default Navigation
