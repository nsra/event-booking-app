import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export default function PrivateRoute({ path, component }) {
    const token = localStorage.getItem('token') || ""
    if (!token) return <Redirect to="/login" />
    else
    return <Route path={path} component={component} />;
}
