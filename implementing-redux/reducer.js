export const reducer = (state = { count: 0 }, action = {}) => {
  let nextState = {}
  switch (action.type) {
    case 'INCREASE':
      nextState = {
        count: state.count + action.payload.count,
      }
      return nextState
    case 'DECREASE':
      nextState = {
        count: state.count - action.payload.count,
      }
      return nextState
    case 'RESET':
      nextState = {
        count: action.payload.count,
      }
      return nextState
    default:
      return state
  }
}
