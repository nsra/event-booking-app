import React, { useState, useContext, useEffect } from 'react' 
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client' 
import { LOGIN } from '../queries'
import AuthContext from '../context/auth-context' 
import Error from '../components/Error' 
import Spinner from '../components/Spinner' 

export default function LoginPage() {
    const value = useContext(AuthContext) 
    const [alert, setAlert] = useState("") 

    function Login() {
        const [email, setEmail] = useState("") 
        const [password, setPassword] = useState("") 
        const history = useHistory();
        const [login, { loading, data }] = useMutation(LOGIN, {
            onError: (error) => setAlert(error.message)
        }) 
        useEffect(() => {
            if (!loading && data) {
                const token = data.login.token 
                const userId = data.login.userId 
                const username = data.login.username
                value.login(token, userId, username) 
                console.log(data.login)
            }
        }, [data, loading]) 

        if (loading) return <Spinner /> 

        return (
            <form className='auth-form' onSubmit={() => {
                login({
                    variables: { email: email, password: password }
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
                        minLength = "6"
                    />
                </div>
                <div className='form-actions'>
                    <button type='submit' className="submit-btn">إرسال</button>
                    <button onClick={() => history.push('/signUp')}>
                        انتقل إلى إنشاء حساب
                    </button>
                </div>
            </form>
        ) 
    }

    return (
        <Login />
    )
}

