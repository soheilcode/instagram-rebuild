export const initialState = {
    stories: null,
    user: null,
    open: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_STORIES':

            return {
                ...state,
                stories: action.stories,
            };
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            };
        default:
            return state
    }
}

export default reducer;