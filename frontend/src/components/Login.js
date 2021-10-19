import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'
import AuthContext from '../context/auth-context'
import Error from './Error'
import Spinner from './Spinner'
export default function Login({ passedEmail, passedPassword, passedAlert }) {
    const value = useContext(AuthContext)
    const [alert, setAlert] = useState(passedAlert)
    const [email, setEmail] = useState(passedPassword)
    // const [pemail, setPEmail] = useState(passedEmail || '')
    // const [ppassword, setPPassword] = useState(passedPassword || '')
    const [password, setPassword] = useState(passedPassword)
    const history = useHistory();
    const [login, { loading, data }] = useMutation(LOGIN, {
        onError: (error) => setAlert(error.message),
        // onCompleted: () => {
        //     setPPassword("")
        //     setPEmail("")
        // }
    })
    if(loading) <Spinner />
    // if(data) console.log(data.login + "data.login")
    if (passedEmail && passedPassword) {
        console.log(passedEmail + "from norm")
    }
    useEffect(() => {
        // if (pemail && ppassword) {
        //     login({
        //         variables: { email: passedEmail, password: passedPassword }
        //     })
        //     setPPassword("")
        //     setPEmail("")
        //     console.log(ppassword + "from effect")
        // }
        if (!loading && data) {
            const token = data.login.token
            const userId = data.login.userId
            const username = data.login.username
            value.login(token, userId, username)
            console.log(data.login.username)
        }
    }, [data, loading, value, passedEmail, passedPassword, login])

    if (loading) return <Spinner />

    return (
        <form className='auth-form' onSubmit={(event) => {
            event.preventDefault();
            login({
                variables: { email: email.trim(), password: password.trim() }
            })
        }}>
            <Error error={alert} />
            <div className='form-control'>
                <label htmlFor='email'>البريد الالكتروني</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                    required
                />
            </div>
            <div className='form-control'>
                <label htmlFor='password'>كلمة المرور</label>
                <input
                    id="password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    type="password"
                    required
                    minLength="6"
                />
            </div>
            <div className='form-actions'>
                <button type='submit' className="submit-btn">إرسال</button>
                <button type="button" onClick={() => {
                    history.push('/signup')
                    setAlert("")
                }}>
                    انتقل إلى إنشاء حساب
                </button>
            </div>
        </form>
    )
}

