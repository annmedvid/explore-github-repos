import React from 'react'
import injectProps from '../../utils/decorators/injectPropsAndState'

import InputField from '../../components/common/InputField'
import Button from '../../components/common/Button'

class HomePage extends React.PureComponent {
	@injectProps
	render({showWarning, onChangeInput, onSearchOwner}) {
		let warning = null
        if (showWarning) {
            warning = <strong>Something went wrong. Try another name.</strong>
        }

		return <article className="home-page_content">
            <h1 className="home-page_explore">explore <a className="github" href="https://github.com">GitHub</a> repos</h1>

            <div className='home-page_warning'>
                {warning}
            </div>

            <form className="home-page_form" onSubmit={e => onSearchOwner(e)}>
                <InputField type="text" name="owner" className="home-page_owner" placeholder="User or organization name" onChange={e => onChangeInput(e)}/>

                <Button type="submit" text="Search" className="home-page_search" onClick={e => onSearchOwner(e)}/>
            </form>

            <small className="home-page_look-around">New to GitHub? <a href="https://github.com">Look around first.</a></small>
    	</article>
	}
}

export default HomePage
