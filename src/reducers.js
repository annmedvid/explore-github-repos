import {combineReducers} from 'redux'
import ownerRepos from './reducers-and-actions/ownerReposReducer'

const rootReducer = combineReducers({
    ownerRepos
})

export default rootReducer
