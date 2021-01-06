import React from "react";


//react router dom
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
                      
//pages
import Home from './pages/Home';
import NewCustomer from './pages/NewCustomer';
import ExistingCustomer from './pages/ExistingCustomer';
import Settings from './pages/Settings';
import EditCustomer from './pages/EditCustomer';
import Login from './pages/Login';
import Error from './pages/Error';


// components

export default function App() {
  return <Router>
    <Switch>
    <Route exact path="/">
        <Login/>
    </Route>
    <Route exact path="/home">
        <Home/>
    </Route>
    <Route  path="/newcustomer">
        <NewCustomer/>
    </Route>
    <Route path="/existcustomer">
        <ExistingCustomer/>
    </Route>
    <Route path="/setting">
        <Settings/>
    </Route>
        <Route path="/editcustomer">
        <EditCustomer/>
    </Route>
     <Route path="*">
        <Error/>
    </Route>
    {/* <Route path="/products/:id"
     children={<ProductDetails></ProductDetails>}
     >
    </Route> */}
   
    </Switch>
    
  </Router>;
}
