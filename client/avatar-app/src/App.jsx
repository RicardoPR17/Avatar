import React from 'react'

import './App.css'

import Login from './components/Login/Login'
import Menu from './components/Menu/Menu'
import Profile from './components/Profile/Profile'

import {
    BrowserRouter as Router,
    Switch,
    Route } from 'react-router-dom'

const App = () => {
    return (
        <main>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Login />
                    </Route>
                    <Route path="/mainPage">
                        <Menu />
                    </Route>
                    <Route path="/profile">
                        <Menu />
                        <Profile />
                    </Route>
                </Switch>
            </Router>
        </main>
    )
}

export default App