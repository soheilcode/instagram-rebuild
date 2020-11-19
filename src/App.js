import React, { useEffect, useState } from 'react'
import './App.css';
import { auth } from './firebase';
import Login from './Login';
import StoryView from './StoryView'
import {BrowserRouter , Redirect, Route , Switch} from 'react-router-dom'
import Home from './Home';
import { useStateValue } from './StateProvider';

function App() {
  const [state , dispatch] = useStateValue()
  const [user, setUser] = useState(null)

    useEffect(()=> {
      auth.onAuthStateChanged(authUser => {
        setUser(authUser)
        dispatch({type : 'SET_USER' , user : authUser})
      })
    },[dispatch])

 
  return (
    <BrowserRouter>
      <Switch>
        
        <Route exact path='/'>
          {user ? <Home /> : <Redirect to='/login' />}
        </Route>

        <Route exact path='/story/:id'>
          {user ? <StoryView /> : <Redirect to='/login' />}
        </Route>

        <Route exact path='/login'>
          {user ? <Redirect to='/' /> : <Login />}
        </Route>

      </Switch>
    </BrowserRouter>
    
    
    
  );
}
        

export default App;
