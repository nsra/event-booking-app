import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client'
import { CREATE_USER, LOGIN } from '../queries'
import Error from '../components/Error'
import Spinner from '../components/Spinner'
import AuthContext from '../context/auth-context'
import Login from '../components/Login'


export default function SignUpPage() {
    const [alert, setAlert] = useState("")
    const value = useContext(AuthContext)

    function SignUp() {
        const [username, setUsername] = useState("")
        const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")
        const history = useHistory();
        const [signup, { loading, error, data }] = useMutation(CREATE_USER, {
            onError: (error) => setAlert(error.message),
            onCompleted: () => {
                setAlert("تم إنشاء الحساب بنجاح")
            }
        })
        if (loading) return <Spinner />
        if (data) {
           return <Login passedEmail={data.createUser.email}
                passedPassword={data.createUser.passedEmail}
                passedAlert={alert}
            />
        }

        return (
            <form className='auth-form' onSubmit={(event) => {
                event.preventDefault()
                if (username.trim().length < 3 || password.trim().length < 6) {
                    setAlert("يجب ملئ جميع الحقول بالشكل الصحيح!")
                    return
                }
                signup({
                    variables: { username: username.trim(), email: email.trim(), password: password.trim() }
                })
            }}>
                <Error error={alert} />
                <div className='form-control'>
                    <label htmlFor='username'>اسم المستخدم</label>
                    <input
                        id="username"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                        required
                    />
                </div>
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
                </div>
            </form>
        )
    }

    return (
        <SignUp />
    )
}