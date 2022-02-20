import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import AuthContext from '../context/auth-context'
 
export default function CustomRedirect({ from, to }) {
    const value = useContext(AuthContext)
    if (!value.token) return <Redirect to="/login" />
    else
        return <Redirect from={from} to={to} />
}
