import React, {Fragment} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ProtectedRoute from './context/utils/ProtectedRoute';
import Navbar from './components/Layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import ContactProvider from './context/contacts/ContactProvider'
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import AuthProvider from './context/auth/AuthProvider';
import AlarmProvider from './context/alarm/AlarmProvider';
import Alarm from './components/Layout/Alarm';
import setAuthToken from './context/utils/setAuthToken';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthProvider>
      <ContactProvider>
        <AlarmProvider>
          <Router>
            <Fragment>
              <Navbar />
              <Alarm />
              <div className="container">
              <Switch>
                <ProtectedRoute exact path="/" component= {Home} />
                <Route exact path="/about" component= {About} />
                <Route exact path="/register" component= {Register} />
                <Route exact path='/login' component= {Login} />
              </Switch>
              </div>
            </Fragment>
          </Router>
        </AlarmProvider>
      </ContactProvider>
    </AuthProvider>
  );
}

export default App;
