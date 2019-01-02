import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

export class PrivateRoute extends Component {
    render() {
        let token = localStorage.getItem("token")
        const { component, ...rest } = this.props;
        return (
            <Route
                {...rest}
                render={(props) => {
                    const Component = component;
                    if (token) return <Component {...props} />;
                    else {
                        return (
                            <Redirect
                                to={{
                                    pathname: '/login'
                                }}
                            />
                        );
                    }
                }}
            />
        );
    }
}