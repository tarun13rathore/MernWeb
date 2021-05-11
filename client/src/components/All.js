import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Login from './Login';
import Register from './Register';
import Footer from './Footer';
import Logout from './Logout'
import Errorpage from './Errorpage';
import 'bootstrap/dist/css/bootstrap.css';
import { Route,Switch } from "react-router-dom";
import { createContext, useReducer } from 'react';
import {initialState, reducer} from '../reducer/UseReducer'

//1. context api
export const UserContext = createContext();

const Routing = () =>{
  return(
    <Switch>
    <Route exact path="/">
      <Home/>
    </Route>

    <Route exact path="/about">
      <About/>
    </Route>

    <Route exact path="/contact">
      <Contact/>
    </Route>

    <Route exact path="/login">
      <Login/>
    </Route>

    <Route exact path="/register">
      <Register/>
    </Route>

    <Route exact path="/logout">
      <Logout/>
    </Route>

    <Route>
      <Errorpage/>
    </Route>
</Switch>
  )
}

function All() {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
    <UserContext.Provider value={{state, dispatch}}>
      <Navbar/>
      <Routing/>
    </UserContext.Provider>
    </>
  );
}

export default All;
