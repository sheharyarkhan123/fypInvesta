import React from "react";
import {getAuthState} from '../actions';
import PropTypes from 'prop-types';
import { Route, Redirect } from "react-router-dom";
import {connect } from 'react-redux';
import { firebaseAuth } from "../firebase";
const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  return (
    <Route
      exact
      path={rest.path}
      render={routeProps =>
        firebaseAuth.currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/signin"} />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  getAuthState: PropTypes.func,
  auth: PropTypes.bool,
}

const mapStateToProps = state =>({
  auth: state.auth,
})
export default connect(mapStateToProps, {getAuthState})(PrivateRoute) 