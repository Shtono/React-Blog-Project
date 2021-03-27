import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthContext';
import { UsersContext } from '../../context/users/UsersContext';

const PrivateRouteAdmin = ({ component: Component, ...rest }) => {
    const { currentUser } = useContext(AuthContext);
    const { currentUserInfo } = useContext(UsersContext);
    return (
        <Route
            {...rest}
            render={props => {
                return (currentUser && currentUserInfo.isAdmin) ? <Component {...props} /> : <Redirect to="/" />
            }}>
        </Route>
    )
}

export default PrivateRouteAdmin;