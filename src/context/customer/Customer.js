import React, {createContext, useReducer, useEffect} from 'react';
import * as api from '../../Api';
import CustomerReducer from './CustomerReducer';


// initial State

const initialState = {
      customers:[]
  }

// Create Context

export const CustomerContext = createContext(initialState);

// Provider Component

export const CustomerProvider = ({children}) => {



    const [state, dispatch] = useReducer(CustomerReducer, initialState);


// Actions


const addCustomer = (user) => {
    dispatch({
        type:'ADD_USER',
        payload:user
    })
}

    return (
        <CustomerContext.Provider value={{
            customers:state.customers,
            addCustomer,
        
            }}>
            {children}</CustomerContext.Provider>
    )
}


