


const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_FILTER':
            console.log(action);
            return action.payload
            
        default:
            return state
    }
}

export const filterChanger = (filter) => {
    return (
        {
            type: 'SET_FILTER',
            payload: filter,
        }
    )
}

export default filterReducer