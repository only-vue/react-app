import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../components/history/history.js';
import jdReport from '../views/onlineRetailers/jdReport';

export default class Routers extends React.Component {
	render() {
		return (
			<Router history={history}>
				<Switch>
					<Route exact path="/" component={jdReport} />
					<Route exact path="/jdReport" component={jdReport} />
				</Switch>
			</Router>
		);
	}
}