import React, {Component} from 'react'
import _ from 'lodash'
import injectState from '../../utils/decorators/injectState'

import Icon from '../common/Icon'

const INITIAL_PARAMS = {
	byName: false,
	byStars: false,
	byIssues: false,
	byUpdated: false
}

class Sorting extends Component {
	constructor(props) {
    	super(props)
    	this.state = {
			byOrder: true,
			params: {
				byName: false,
		    	byStars: false,
		    	byIssues: false,
		   		byUpdated: false
			}
		}

    	this.pickParam = ::this.pickParam
    	this.changeOrder = ::this.changeOrder
  	}

  	pickParam(param) {
  		const {setSortParam} = this.props
  		const newParams = {
  			...INITIAL_PARAMS,
  			[param]: !this.state.params[param]
  		}
  		this.setState({
  			params: newParams
  		})
  		if (!this.state.params[param]) {
  			return setSortParam({param, order: this.state.byOrder})
  		}
  		setSortParam(null)
  	}

  	changeOrder() {
  		const {setSortParam} = this.props
  		const {byOrder, params} = this.state
    	this.setState({byOrder: !byOrder})
    	let param
    	_.forOwn(params, (value, key) => {
    		if (value) param = key
    	})
    	setSortParam({param, order: !byOrder})
  	}

	@injectState
	render({byOrder, params}) {
		const {byName, byStars, byIssues, byUpdated} = params
		const orderType = <span onClick={this.changeOrder}><Icon type="next" className={`icon ${byOrder ? "desc" : "asc"}`} /></span>

		return <nav className="navigation-sorting">
			<ul>
				<li>
					<span className={`navigation-link canBePicked ${byName ? "picked" : ""}`} onClick={() => this.pickParam("byName")}>repo name</span>
					{byName ? orderType : null}
				</li>
				<li>
					<span  className={`navigation-link canBePicked ${byStars ? "picked" : ""}`} onClick={() => this.pickParam("byStars")}>stars count</span>
					{byStars ? orderType : null}
				</li>
				<li>
					<span  className={`navigation-link canBePicked ${byIssues ? "picked" : ""}`} onClick={() => this.pickParam("byIssues")}>open issues count</span>
					{byIssues ? orderType : null}
				</li>
				<li>
					<span  className={`navigation-link canBePicked ${byUpdated ? "picked" : ""}`} onClick={() => this.pickParam("byUpdated")}>updated date</span>
					{byUpdated ? orderType : null}
				</li>
			</ul>
		</nav>
	}
}

export default Sorting
