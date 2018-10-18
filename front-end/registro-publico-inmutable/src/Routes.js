// Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import App from './App';
import Home from './Components/Global/Home'
//import Login from './Components/Modulars/Login/Login'
//import Page404 from './Components/Modulars/Page404/Page404'

const AppRoutes = () => 
    <App>
        <Switch>
            <Route exact path="/" component={Home} />
        </Switch>
    </App>      

export default AppRoutes;