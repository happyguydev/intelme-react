import React, { PureComponent } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Dashboard from '../../../pages/dashboard';
import Notifications from '../../../pages/notifications';
import People from '../../../pages/people';
import Projects from '../../../pages/projects';
import Project from '../../../pages/projects/project';
import Settings from '../../../pages/settings';
import NotFound from '../../../pages/notFound';

import MyTasks from '../../../pages/tasks';

export default class AuthRoutes extends PureComponent {
  ClientRoute = ({ component: Component, ...rest }) => {
    const hasAccess = !!this.props.user.access_token;
    return (
      <Route
        {...rest}
        render={(propsComponent) => {
          return hasAccess ? (
            <Component {...propsComponent} />
          ) : (
            <Redirect to={{ pathname: '/login' }} />
          );
        }}
      />
    );
  };

  render() {
    const { user } = this.props;
    const ClientRoute = this.ClientRoute;

    return (
      <Switch>
        <ClientRoute path="/dashboard" exact component={Dashboard} />
        <ClientRoute path="/tasks" exact component={MyTasks} />
        <ClientRoute path="/people" exact component={People} />
        <ClientRoute path="/projects" exact component={Projects} />
        <ClientRoute path="/projects/:id" exact component={Project} />
        <ClientRoute
          path="/dashboard/notifications"
          exact
          component={Notifications}
        />
        <ClientRoute path="/settings" exact component={Settings} />

        {user && <ClientRoute exact component={NotFound} />}
      </Switch>
    );
  }
}
