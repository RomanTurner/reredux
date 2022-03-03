import { logger } from './middleware.js'

const createStore = (reducer, persistedState) => {
  if (typeof reducer !== 'function') {
    throw new Error('Reducer is required to be a function')
  }
  const store = {}
  store.subscribers = []
  store.state = persistedState || reducer()
  store.getState = () => store.state
  store.subscribe = subscriber => {
    store.subscribers.push(subscriber)
    return () => {
      store.subscribers = store.subscribers.filter(s => s !== subscriber)
    }
  }

  store.dispatch = action => {
    if (typeof action.type !== 'string') {
      throw new Error('Action type must be a string')
    }
    store.state = reducer(store.state, action)
    store.subscribers.forEach(subscriber => subscriber(store.state))
  }
  return store
}

const applyMiddleware = (store, middlewares) =>
  middlewares
    .slice()
    .reverse()
    .forEach(middleware => {
      store.dispatch = middleware(store)(store.dispatch)
    })

const configureStore = (reducer, persistedState) => {
  const store = createStore(reducer, persistedState)
  const middlewares = [logger]

  applyMiddleware(store, middlewares)

  return store
}

// const combineReducers = reducers => {
//   return (state = {}, action) => {
//     return Object.keys(reducers).reduce((nextState, key) => {
//       nextState[key] = reducers[key](state[key], action)
//       return nextState
//     }, {})
//   }
// }

export { createStore, configureStore, applyMiddleware }
