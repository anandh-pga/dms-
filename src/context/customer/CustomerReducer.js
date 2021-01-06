export default (state, action) => {
    switch(action.type){
  
        case 'ADD_USER':
            return {
                // users:[action.payload, ...state.customers]
            }
        return {
            users:[action.payload, ...state.customers]
        }

        default:
            return state
     
    }
}