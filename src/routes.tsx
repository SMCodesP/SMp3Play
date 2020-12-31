import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import Home from './pages/home'
import Playlists from './pages/playlists'
import Playlist from './pages/playlist'
import Search from './pages/search'

const Routes = () => {
	return (
	    <HashRouter basename="/smp3">
	        <Switch>
	            <Route path="/" exact={true} component={Home} />
	            <Route path="/search" component={Search} />
	            <Route path="/playlists" component={Playlists} />
	            <Route path="/playlist/:id" component={Playlist} />
	        </Switch>
	    </HashRouter>
	)
}

export default Routes