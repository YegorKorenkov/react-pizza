import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)

window.store = store;

export default store;