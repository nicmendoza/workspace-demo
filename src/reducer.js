const initialState = {
    objects: []
}

export default function appReducer(state = initialState, action) {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    case 'objects/add': {
      return Object.assign({}, state, {
        todos: state.objects.concat({
          text: action.text,
          completed: false
        })
      });
    }
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state
  }
}