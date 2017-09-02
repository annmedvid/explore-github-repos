import React from 'react'
import {Switch, Route} from 'react-router-dom'

import HomePageContainer from './pages/home-page/HomePageContainer'
import ReposPageContainer from './pages/repos-page/ReposPageContainer'

export default (
	<Switch>
		<Route exact path='/' component={HomePageContainer}/>
		<Route path='/kottans' render={({match}) => <ReposPageContainer filter={match.params.filter} />} />
	</Switch>
)
