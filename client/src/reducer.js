import { combineReducers } from 'redux'

const defaultRests = {
  restsList: [],
}

function restResults(state=defaultRests, action) {
  switch (action.type) {
    case "setRestaurants":
      return {
        ...state,
        restsList: action.rests
      };
    default:
      return state
  }
}

function pageControl(state=1, action) {
  switch (action.type) {
    case "next":
      return state + 1;
    case "previous":
      return state - 1
    default:
      return state
  }
}

const restReducer = combineReducers({
  rests: restResults,
  pageIndex: pageControl
})

export default restReducer;
