import { reducer } from './reducer.js'
import { configureStore } from './reredux.js'
import { saveState, loadState } from './middleware.js'
import { increase, decrease, resetClick } from './actions.js'

const up = document.getElementById('up')
const down = document.getElementById('down')
const reset = document.getElementById('reset')
const countNode = document.getElementById('count')

const persistedState = loadState()
const store = configureStore(reducer, persistedState)

store.subscribe(() => {
  const state = store.getState()
  const count = state.count
  saveState(state)
  countNode.textContent = count
})

store.dispatch({ type: 'INITIALIZE' })
up.addEventListener('click', () => increase(store))
down.addEventListener('click', () => decrease(store))
reset.addEventListener('click', () => resetClick(store))
