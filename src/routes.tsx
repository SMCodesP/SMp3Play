import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './pages/home'
import Search from './pages/search'

const Routes = () => {
	return (
	    <BrowserRouter>
	        <Switch>
	            <Route path="/" exact={true} component={Home} />
	            <Route path="/search" component={Search} />
	        </Switch>
	    </ BrowserRouter>
	)
}

export default Routes