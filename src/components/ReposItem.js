import React, {Component} from 'react'
import injectPropsAndState from '../utils/decorators/injectPropsAndState'
import getDate from '../utils/getDate'
import transformAmount from '../utils/transformAmount'

import Icon from '../components/common/Icon'

class ReposItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showTip: true
        }

        this.checkIfShowTip = ::this.checkIfShowTip
    }

    checkIfShowTip(event) {
        const element = event.target
        if (element.offsetWidth >= element.scrollWidth) {
            this.setState({showTip: false})
        } else {
            this.setState({showTip: true})
        }
    }

	@injectPropsAndState
	render({repo, selectRepo}, {showTip}) {
		return <section className="repos_item" onClick={() => selectRepo(repo)}>
            <h2 className="item_name" data-tip={showTip ? repo.name : null} onMouseOver={this.checkIfShowTip}>
                {repo.name}
            </h2>
            <p className="item_stars">
                <Icon type="star" className="icon"/>
                {transformAmount(repo.stargazers_count)}
            </p>
            <p className="item_lang">{repo.language}</p>
            <p className="item_updated">
                <Icon type="reload" className="icon"/>
                {`Updated on ${getDate(repo.updated_at)}`}
            </p>
            <p className="item_description" data-tip={showTip ? repo.description : null} onMouseOver={this.checkIfShowTip}>
                {repo.description}
            </p>
        </section>
	}
}

export default ReposItem
