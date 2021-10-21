import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from "../App"

export default function CustomRedirect({ from, to }) {
    const value = useContext(AuthContext)
    if (!value.token) return <Redirect to="/login" />
    else
        return <Redirect from={from} to={to} />
}
