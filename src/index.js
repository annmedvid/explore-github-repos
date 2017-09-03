import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {composeWithDevTools} from 'redux-devtools-extension'

import rootReducer from './reducers'
import routes from './routes'
import rootSaga from './sagas'

import './styles/main.scss'

const sagaMiddleware = createSagaMiddleware()

let store = createStore(
	rootReducer,
	composeWithDevTools(
  		applyMiddleware(sagaMiddleware)
  	)
)

sagaMiddleware.run(rootSaga)

ReactDOM.render(
	<Provider store={store}>
		<HashRouter>
			{routes}
		</HashRouter>
  	</Provider>,
  document.querySelector('.app')
)
