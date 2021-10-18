import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import AuthContext from '../context/auth-context'

export default function PrivateRoute({ path, component }) {
    const value = useContext(AuthContext)
    if (!value.token) return <Redirect to="/login" />
    else
    return <Route path={path} component={component} />;
}