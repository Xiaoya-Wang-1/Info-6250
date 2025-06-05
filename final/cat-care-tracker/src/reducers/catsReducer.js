export default function catsReducer(state, action) {
    switch (action.type) {
      case 'SET_CATS':     return action.cats
      case 'ADD_CAT':      return [...state, action.cat]
      case 'DELETE_CAT':   return state.filter(c=>c.catId!==action.catId)
      case 'UPDATE_CAT':   return state.map(c=>c.catId===action.cat.catId?action.cat:c)
      case 'ADD_TASK':     return state.map(c=>c.catId===action.catId?{...c,tasks:[...c.tasks,action.task]}:c)
      case 'UPDATE_TASK':  return state.map(c=>c.catId===action.catId?{...c,tasks:c.tasks.map(t=>t.taskId===action.task.taskId?action.task:t)}:c)
      case 'DELETE_TASK':  return state.map(c=>c.catId===action.catId?{...c,tasks:c.tasks.filter(t=>t.taskId!==action.taskId)}:c)
      default:             return state
    }
  }  