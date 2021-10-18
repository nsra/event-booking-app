import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../queries'
import Error from '../components/Error'
import Spinner from '../components/Spinner'

export default function SignUpPage() {
    const [alert, setAlert] = useState("")

    function SignUp() {
        const [username, setUsername] = useState("")
        const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")
        const history = useHistory();
        const [auth, { loading }] = useMutation(CREATE_USER, {
            onError: (error) => setAlert(error.message),
            onCompleted: () => {
                setAlert("تم إنشاء الحساب بنجاح")
            }
        })

        if (loading) return <Spinner />

        return (
            <form className='auth-form' onSubmit={() => {
                if (username.trim().length < 3 || password.trim().length < 6) {
                    setAlert("يجب ملئ جميع الحقول بالشكل الصحيح!")
                    return
                }
                auth({
                    variables: { username: username, email: email, password: password }
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
                    <button onClick={() => history.push('/login')}>
                        انتقل إلى تسجيل الدخول 
                    </button>
                </div>
            </form>
        )
    }

    return (
        <SignUp />
    )
}

