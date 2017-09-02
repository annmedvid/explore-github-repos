import React, {Component} from 'react'
import _ from 'lodash'
import injectPropsAndState from '../../utils/decorators/injectPropsAndState'
import KeyGenerator from '../../utils/KeyGenerator'

import InputField from '../../components/common/InputField'

const INITIAL_TYPES = {
	hasTypeAll: false,
   	hasTypeFork: false,
    hasTypeSourse: false
}

class Filters extends Component {
	constructor(props) {
    	super(props)
    	this.state = {
    		hasIssues: false,
    		hasTopics: false,
    		hasStars: '',
    		updatedAfter: '',
    		type: {
				hasTypeAll: true,
			   	hasTypeFork: false
			},
    		particularLang: 'all'
    	}

    	this.selectValue = ::this.selectValue
    	this.selectOption = ::this.selectOption
    	this.selectType = ::this.selectType
  	}

  	componentWillMount() {
		const filters = JSON.parse(localStorage.getItem('filters')) || null
		if (filters) this.setState({...filters})
  	}

  	componentDidUpdate(prevProps, prevState) {
  		const {setFilterParam} = this.props
	  	if (_.isEqual(this.props, prevProps) && !_.isEqual(this.state, prevState)) {
	    	setFilterParam(this.state)  
	  	}
	}

  	selectValue(e) {
  		const lang = e.target
  		this.setState({[lang.name]: lang.value})
  	}

  	selectOption(param) {
  		this.setState({[param]: !this.state[param]})
  	}

  	selectType(param) {
  		const {type} = this.state
  		const newType = type[param] ? {...INITIAL_TYPES, [param]: !type[param], hasTypeAll: true} : {...INITIAL_TYPES, [param]: !type[param]}
  		this.setState({type: newType})
  	}

	@injectPropsAndState
	render({repos, languageList}, {hasIssues, hasTopics, hasStars, updatedAfter, type, particularLang}) {
		const {hasTypeAll, hasTypeFork} = type

		return <nav className="navigation-filters">
			<ul>
				<li className={`navigation-link canBePicked ${hasIssues ? "picked" : ""}`}>
					<span onClick={() => this.selectOption('hasIssues')}>has open issues</span>
				</li>
				<li className={`navigation-link canBePicked ${hasTopics ? "picked" : ""}`}>
					<span onClick={() => this.selectOption('hasTopics')}>has topics</span>
				</li>
				<li className="navigation-link">
					<span>starred >= </span>
					<InputField type="number" name="hasStars" className="input-starred" min="0" value={hasStars} onChange={e => this.selectValue(e)} />
					<span> times</span>
				</li>
				<li className="navigation-link">
					<span>updated after </span>
					<InputField type="date" name="updatedAfter" className="input-updated" value={updatedAfter} onChange={e => this.selectValue(e)} />
					<span> date</span>
				</li>
				<li className="navigation-link">type
					<span className={`canBePicked ${hasTypeAll ? "picked" : ""}`} onClick={() => this.selectType('hasTypeAll')}> all</span><span>, </span>
					<span className={`canBePicked ${hasTypeFork ? "picked" : ""}`} onClick={() => this.selectType('hasTypeFork')}>forks</span>
				</li>
				<li className="navigation-link">
					<span>language</span>
					<select name="particularLang" className="input-language" value={particularLang} onChange={e => this.selectValue(e)}>
						<option>all</option>
						{languageList.map(lang => <option key={KeyGenerator.getNext()}>{lang || 'not defined'}</option>)}
					</select>
				</li>
			</ul>
		</nav>
	}
}

export default Filters
