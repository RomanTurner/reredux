function increase(store) {
  store.dispatch({
    type: 'INCREASE',
    payload: {
      count: 1,
    },
  })
}

function decrease(store) {
  store.dispatch({
    type: 'DECREASE',
    payload: {
      count: 1,
    },
  })
}

function resetClick(store) {
  store.dispatch({
    type: 'RESET',
    payload: {
      count: 0,
    },
  })
}

export { increase, decrease, resetClick }
