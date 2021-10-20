import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import AuthContext from '../context/auth-context'

export default function CustomRedirect({ path, from, to, component }) {
    const value = useContext(AuthContext)
    if (!value.token) return <Redirect to="/login" />
    else
        return from&&to ? <Redirect from={from} to={to} /> : <Route path={path} component={component} />;
}
