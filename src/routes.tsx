import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import Home from './pages/home'
import Playlists from './pages/home'
import Search from './pages/search'

const Routes = () => {
	return (
	    <HashRouter basename="/smp3">
	        <Switch>
	            <Route path="/" exact={true} component={Home} />
	            <Route path="/search" component={Search} />
	            <Route path="/playlists" component={Playlists} />
	        </Switch>
	    </HashRouter>
	)
}

export default Routes