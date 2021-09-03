import { PureComponent } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ResetPassword from '../../../pages/resetPassword';
import ForgotPassword from '../../../pages/forgotPassword';
import Login from '../../../pages/login';
import NotFound from '../../../pages/notFound';

export default class GuestRoutes extends PureComponent {
  GuestRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(propsComponent) =>
        !this.props.user.access_token ? (
          <Component {...propsComponent} />
        ) : (
          <Redirect to={{ pathname: '/dashboard' }} />
        )
      }
    />
  );

  render() {
    const { user } = this.props;
    const GuestRoute = this.GuestRoute;

    return (
      <Switch>
        <GuestRoute exact path="/">
          <Redirect to="/login" />
        </GuestRoute>
        <GuestRoute path="/login" exact component={Login} />
        {/* <GuestRoute path="/activate" component={ActivationPage} /> */}
        <GuestRoute path="/forgot-password" component={ForgotPassword} />
        <GuestRoute path="/reset-password" component={ResetPassword} />

        {!user && <GuestRoute exact component={NotFound} />}
      </Switch>
    );
  }
}
