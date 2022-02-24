import React, {createContext, useReducer} from 'react';

export const UserContext = createContext();
const initialState = {
    uid: '',
    name: '',
    email: ''
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'setUser':
            return {...state, uid: action.payload.uid, name: action.payload.name, email: action.payload.email};
        default:
            return state;
    }
}

export default({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <UserContext.Provider value={{state, dispatch}}>
            {children}
        </UserContext.Provider>
    );
}